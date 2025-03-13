const express = require('express');
const router = express.Router();
const { createClient } = require('redis');

const redisClient = createClient({
   url: "redis://localhost:3030"
});

redisClient.connect().catch(console.error);


// ✅ 장바구니 조회
router.get("/", async (req, res) => {
   const userId = req.sessionID;
   let cart = await redisClient.get(`cart:${userId}`);
   res.json({ cart: cart ? JSON.parse(cart) : [] });
});

// ✅ 장바구니 상품 삭제
router.post("/remove", async (req, res) => {
   const { product_id } = req.body;
   const userId = req.sessionID;

   let cart = await redisClient.get(`cart:${userId}`);
   cart = cart ? JSON.parse(cart) : [];

   cart = cart.filter(item => item.product_id !== product_id);

   await redisClient.set(`cart:${userId}`, JSON.stringify(cart), { EX: 1800 });

   res.json({ success: true, cart });
});

// ✅ 장바구니 초기화 (전체 삭제)
router.post("/clear", async (req, res) => {
   const userId = req.sessionID;
   await redisClient.del(`cart:${userId}`);
   res.json({ success: true, message: "장바구니를 비웠습니다." });
});



module.exports = router;