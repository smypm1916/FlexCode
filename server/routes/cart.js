const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const CART_TTL = 2592000; // 30일 (초 단위)

module.exports = (redisClient) => {
   const getCartKey = (req) => {
      const userCartId = req.session?.user?.email;
      const guestCartId = req.sessionID;
      return userCartId ? `cart:${userCartId}` : `cart:session_${guestCartId}`;
   };

   const generateTempOrderId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

   async function mergeCart(guestCartId, userCartId) {
      try {
         const guestCartData = await redisClient.hGetAll(guestCartId);
         const userCartData = await redisClient.hGetAll(userCartId);
         const mergedCart = {};

         Object.entries(userCartData).forEach(([key, value]) => {
            if (key !== 'tempOrderId') mergedCart[key] = JSON.parse(value);
         });

         Object.entries(guestCartData).forEach(([key, value]) => {
            if (key === 'tempOrderId') return;
            try {
               const guestItem = JSON.parse(value);
               if (mergedCart[key]) {
                  mergedCart[key].quantity += guestItem.quantity;
                  mergedCart[key].updatedAt = new Date().toISOString();
               } else {
                  mergedCart[key] = guestItem;
               }
            } catch (err) {
               console.error('Guest cart parsing error:', err, value);
            }
         });

         await redisClient.del(guestCartId);

         const redisHSetArgs = [];
         Object.entries(mergedCart).forEach(([key, item]) => {
            redisHSetArgs.push(key, JSON.stringify(item));
         });

         if (redisHSetArgs.length > 0) {
            await redisClient.hSet(userCartId, redisHSetArgs);
         }

         const tempOrderId = userCartData.tempOrderId || guestCartData.tempOrderId || generateTempOrderId();
         await redisClient.hSet(userCartId, 'tempOrderId', tempOrderId);

         await redisClient.del(guestCartId);
         await redisClient.expire(userCartId, CART_TTL);
         console.log(mergedCart)
         return mergedCart;

      } catch (error) {
         console.error('Cart merge error:', error);
         throw new Error('장바구니 병합 실패');
      }
   }

   // 토큰 인증
   const authenticateToken = async (req, res, next) => {
      const token = req.headers['authorization']?.split(' ')[1];
      if (token) {
         try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const storedToken = await redisClient.get(`token:${decoded.email}`);
            if (storedToken !== token) {
               return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
            }
            req.user = decoded;
         } catch (error) {
            return res.status(403).json({ message: '토큰 검증 오류' });
         }
      }
      next();
   };

   // 로그인 시 장바구니 병합
   router.post('/auth/login', async (req, res) => {
      try {
         const { user_email, guestSessionId } = req.body;

         req.session.user = { email: user_email };

         const guestCartId = `cart:${guestSessionId}`;
         const userCartId = `cart:${user_email}`;
         console.log(guestCartId)
         const mergedCart = await mergeCart(guestCartId, userCartId);
         console.log(mergedCart)
         // Redis에서 새 tempOrderId 조회 (중요!)
         const newTempOrderId = await redisClient.hGet(userCartId, 'tempOrderId');
         console.log("newtemp : " + newTempOrderId);


         const token = jwt.sign({ email: user_email }, process.env.JWT_SECRET, { expiresIn: '1h' });
         await redisClient.set(`token:${user_email}`, token);

         res.status(200).json({
            success: true,
            token,
            message: '장바구니 병합 성공',
            cart: mergedCart,
            tempOrderId: newTempOrderId // 새 tempOrderId 전달
         });
      } catch (error) {
         console.error('로그인(장바구니 병합) 오류:', error);
         res.status(500).json({ success: false, message: '장바구니 병합 중 오류 발생' });
      }
   });

   // 장바구니 조회
   router.get("/read/", authenticateToken, async (req, res) => {
      console.log("cart read >>>>>>>>>>>>>>")
      try {
         // const { tempOrderId: paramOrderId } = req.params;

         let cartKey;
         if (paramOrderId) {
            // URL 파라미터로 받은 tempOrderId를 직접 사용
            cartKey = `cart:${paramOrderId}`;
         } else {
            // 파라미터가 없으면 세션/로그인 유저 기반으로 장바구니 식별
            cartKey = getCartKey(req);
         }
         if (!cartKey) {
            return res.status(400).json({ success: false, message: '장바구니 키가 없습니다' });
         }

         const cartData = await redisClient.hGetAll(cartKey);
         // 혹은 cartData가 비어있다면, 필요 시 tempOrderId 생성
         let tempOrderId = cartData.tempOrderId || null;
         delete cartData.tempOrderId;

         const parsedCart = Object.entries(cartData).map(([productKey, value]) => {
            try {
               return JSON.parse(value);
            } catch (err) {
               console.error("장바구니 데이터 파싱 오류:", err);
               return null;
            }
         }).filter(Boolean);

         // 비어있으면 tempOrderId가 없을 수 있음
         if (!tempOrderId && parsedCart.length > 0) {
            tempOrderId = generateTempOrderId();
            await redisClient.hSet(cartKey, 'tempOrderId', tempOrderId);
         }

         return res.status(200).json({
            success: true,
            products: parsedCart,
            tempOrderId,
            isEmpty: parsedCart.length === 0
         });
      } catch (error) {
         console.error(error);
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
            await redisClient.hSet(cartKey, cartItemKey, JSON.stringify({
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
         await redisClient.expire(cartKey, CART_TTL);
         res.status(200).json({ success: true, message: "장바구니에 추가되었습니다.", tempOrderId });
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
         const { productKey } = req.body;
         const key = getCartKey(req);
         await redisClient.hDel(key, productKey);
         res.status(200).json({ success: true, message: "장바구니가 비워졌습니다." });
      } catch (error) {
         res.status(500).json({ success: false, message: "장바구니 삭제 중 오류 발생.", error: error.message });
      }
   });

   return router;
}
