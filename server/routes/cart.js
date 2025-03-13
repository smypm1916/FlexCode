const express = require("express");
const router = express.Router();
const { createClient } = require("redis");

const redisClient = createClient({
   url: "redis://localhost:6379", // 기본 Redis 포트로 변경
});

redisClient.connect().catch(console.error);

const CART_TTL = 2592000; // 30일 (초 단위)

//  장바구니 키 가져오는 함수 (user_email 또는 session 기반)
const getCartKey = (req) => {
   const user_email = req.session?.user?.email;
   const sessionId = req.sessionID;
   return user_email ? `cart:${user_email}` : `cart:session_${sessionId}`;
};

// 장바구니에 상품 추가
router.post("/add", async (req, res) => {
   try {
      const { product_no, product_price, option_no, option_price, product_quantity } = req.body;
      const key = getCartKey(req);

      await redisClient.hSet(key, `product:${product_no}`, JSON.stringify({
         product_price,
         option_no,
         option_price,
         quantity: product_quantity,
         cart_date: new Date().toISOString(),
      }));

      await redisClient.expire(key, CART_TTL);
      res.status(200).json({ success: true, message: "장바구니에 추가되었습니다." });
   } catch (error) {
      res.status(500).json({ success: false, message: "장바구니 추가 중 오류 발생.", error: error.message });
   }
});

// 장바구니 조회
router.get("/", async (req, res) => {
   try {
      const key = getCartKey(req);
      const cartItems = await redisClient.hGetAll(key);

      const parsedCart = Object.entries(cartItems).map(([_, value]) => {
         try {
            return JSON.parse(value);
         } catch (err) {
            return null;
         }
      }).filter(Boolean);

      res.status(200).json({ success: true, cart: parsedCart });
   } catch (error) {
      res.status(500).json({ success: false, message: "장바구니 조회 중 오류 발생.", error: error.message });
   }
});

//  비로그인 상태에서 로그인 시, 장바구니 세션 통합
router.post("/merge", async (req, res) => {
   try {
      const user_email = req.session?.user?.email;
      const sessionId = req.sessionID;

      if (!user_email) {
         return res.status(400).json({ success: false, message: "로그인 후 시도하세요." });
      }

      const guestKey = `cart:session_${sessionId}`;
      const userKey = `cart:${user_email}`;

      const guestCart = await redisClient.hGetAll(guestKey);
      if (guestCart && Object.keys(guestCart).length > 0) {
         for (const [key, value] of Object.entries(guestCart)) {
            await redisClient.hSet(userKey, key, value);
         }
         await redisClient.del(guestKey);
      }

      await redisClient.expire(userKey, CART_TTL);
      res.status(200).json({ success: true, message: "장바구니가 통합되었습니다." });
   } catch (error) {
      res.status(500).json({ success: false, message: "장바구니 통합 중 오류 발생.", error: error.message });
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

module.exports = router;
