const express = require("express");
const { use } = require("react");
const router = express.Router();
const CART_TTL = 2592000; // 30일 (초 단위)

//Redis는 테이블 생성없이 메모리에 데이터를 k-v{hash(map)}형태로 저장

module.exports = (redisClient) => {
   //  장바구니 키 가져오는 함수 (user_email 또는 session 기반)
   const getCartKey = (req) => {
      const userCartId = req.session?.user?.email; // 로그인
      const guestCartId = req.sessionID; // 비로그인
      return userCartId ? `cart:${userCartId}` : `cart:session_${guestCartId}`;
   };

   const generateTempOrderId = () => `order:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

   // 장바구니 병합 함수
   async function mergeCart(guestCartId, userCartId) {
      try {
         const guestCartData = await redisClient.hGetAll(guestCartId);
         const userCartData = await redisClient.hGetAll(userCartId);
         const mergedCart = {};

         // 로그인 장바구니 항목 추가
         Object.entries(userCartData).forEach(([key, value]) => {
            mergedCart[key] = JSON.parse(value);
         });

         // 비로그인 장바구니 병합
         Object.entries(guestCartData).forEach(([key, value]) => {
            if (key === 'tempOrderId') return;
            const guestItem = JSON.parse(value);
            if (mergeCart[key]) {
               mergedCart[key].quantity += guestItem.quantity;
               mergedCart[key].updatedAt = new Date().toISOString();
            } else {
               mergedCart[key] = guestItem;
            }
         });

         // 병합된 데이터를 Redis에 저장
         await redisClient.del(userCartId); // 기존 데이터 제거
         await redisClient.hSet(userCartId, Object.fromEntries(
            Object.entries(mergedCart).map(([key, item]) => [key, JSON.stringify(item)])
         ));

         const tempOrderId = userCartData.tempOrderId || guestCartData.tempOrderId || generateTempOrderId();
         await redisClient.hSet(userCartId, 'tempOrderId', tempOrderId);

         // 비로그인 장바구니 삭제(선택사항)
         await redisClient.del(guestCartId);

         await redisClient.expire(userCartId, CART_TTL);

         return mergedCart;
         // return { tempOrderId, products: Object.values(mergeCart) };
      } catch (error) {
         console.error('장바구니 병합 오류:', error);
         throw new Error('장바구니 병합 실패');
      }
   };

   // redis토큰 검증
   const authenticateToken = async (req, res, next) => {
      const token = req.headers['authorization']?.split(' ')[1];
      if (token) {
         try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const storedToken = await redisClient.get(`token:${decoded.email}`);
            if (!storedToken || storedToken !== token) {
               return res.status(403).json({ message: '토큰 불일치' });
            }
            req.user = decoded;
         } catch (error) {
            console.error('토큰 검증 중 오류 발생:', error);
            return res.status(403).json({ message: '토큰 검증 오류' });
         }
      }
      next();
   };


   // 로그인 시 장바구니 자동 병합  
   router.post('/auth/login', async (req, res) => {
      try {
         const { user_email, password } = req.body;
         const user = await authenticateUser(user_email, password);
         if (!user) {
            return res.status(401).json({ success: false, message: '로그인 인증 실패' });
         }
         req.session.user = { email: user_email };
         const key = getCartKey(req);
         const guestCartId = `cart:session_${req.sessionID}`;
         const userCartId = `cart:${user_email}`;
         const mergedCart = await mergeCart(guestCartId, userCartId);
         // jwt 토큰
         const token = jwt.sign({ email: user_email }, process.env.JWT_SECRET, { expiresIn: '1h' });
         await redisClient.set(`token:${user_email}`, token);
         res.status(200).json({ success: true, token, message: '로그인/장바구니 병합 성공', cart: mergedCart });
      }
      catch (error) {
         console.error('로그인 오류:', error);
         res.status(500).json({ success: false, message: '로그인 중 오류 발생' });
      }
   });

   // 장바구니 조회
   router.get("/read", authenticateToken, async (req, res) => {
      try {
         const cartKey = getCartKey(req);
         console.log('key:', cartKey);
         if (!cartKey) {
            return res.status(400).json({ success: false, message: '장바구니 키가 없습니다' });
         }
         const cartData = await redisClient.hGetAll(cartKey);
         const tempOrderId = cartData.tempOrderId;
         delete cartData.tempOrderId;

         // 빈 바구니 조회
         if (!cartData || Object.keys(cartData).length === 0) {
            return res.status(200).json({ success: true, products: [], tempOrderId, isEmpty: true });
         }

         const parsedCart = Object.entries(cartData).map(([productKey, value]) => {
            try {
               return JSON.parse(value);
            } catch (err) {
               console.error("장바구니 데이터 파싱 오류:", err);
               return null;
            }
         }).filter(Boolean);

         res.status(200).json({ success: true, cart: parsedCart, isEmpty: parsedCart.length === 0 });
      } catch (error) {
         res.status(500).json({ success: false, message: "장바구니 조회 중 오류 발생.", error: error.message });
      }
   });

   // 장바구니에 상품 추가
   router.post("/add", async (req, res) => {
      try {
         const cartKey = getCartKey(req);
         const { product_no, product_name, product_price, options, product_quantity, cart_date } = req.body;
         if (!options || !Array.isArray(options) || options.length === 0) {
            return res.status(400).json({ success: false, message: "옵션 정보가 필요합니다." });
         }

         let tempOrderId = await redisClient.hGet(cartKey, 'tempOrderId');
         if (!tempOrderId) {
            tempOrderId = generateTempOrderId();
            await redisClient.hSet(cartKey, 'tempOrderId', tempOrderId);
         }

         for (const option of options) {
            const cartItemKey = `product:${product_no}:option:${option.option_no}`;
            const user_email = req.session?.user?.email || null;
            await redisClient.hSet(key, cartItemKey, JSON.stringify({
               product_no,
               product_name,
               product_price,
               option_no: option.option_no,
               option_title: option.option_title,
               option_price: option.option_price,
               quantity: option.quantity,
               cart_date: new Date().toISOString(),
            }));
         }
         await redisClient.expire(key, CART_TTL);
         res.status(200).json({ success: true, message: "장바구니에 추가되었습니다." });
      } catch (error) {
         console.error('server error:', error);
         res.status(500).json({ success: false, message: "장바구니 추가 중 오류 발생.", error: error.message });
      }
   });

   // 장바구니 수량 변경
   router.put("/update", async (req, res) => {
      try {
         const { product_no, new_quantity } = req.body;
         const key = getCartKey(req);

         let cartItem = await redisClient.hGet(key, `product:${product_no}`);
         if (!cartItem) {
            return res.status(404).json({ success: false, message: "상품이 장바구니에 없음." });
         }

         cartItem = JSON.parse(cartItem);
         cartItem.quantity = new_quantity;

         await redisClient.hSet(key, `product:${product_no}`, JSON.stringify(cartItem));

         res.status(200).json({ success: true, message: "수량이 변경되었습니다." });
      } catch (error) {
         res.status(500).json({ success: false, message: "장바구니 수량 변경 중 오류 발생.", error: error.message });
      }
   });

   //  장바구니에서 특정 상품 삭제
   router.delete("/remove", async (req, res) => {
      try {
         const { product_no } = req.body;
         const key = getCartKey(req);

         await redisClient.hDel(key, `product:${product_no}`);
         res.status(200).json({ success: true, message: "상품이 삭제되었습니다." });
      } catch (error) {
         res.status(500).json({ success: false, message: "장바구니 상품 삭제 중 오류 발생.", error: error.message });
      }
   });

   //  장바구니 전체 삭제
   router.delete("/clear", async (req, res) => {
      try {
         const key = getCartKey(req);
         await redisClient.del(key);
         res.status(200).json({ success: true, message: "장바구니가 비워졌습니다." });
      } catch (error) {
         res.status(500).json({ success: false, message: "장바구니 삭제 중 오류 발생.", error: error.message });
      }
   });

   return router;
}
