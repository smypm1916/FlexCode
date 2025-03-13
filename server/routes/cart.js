const express = require('express');
const router = express.Router();
const { createClient } = require('redis');

const redisClient = createClient({
   url: "redis://localhost:3030"
});

redisClient.connect().catch(console.error);

// 장바구니에 상품 추가
router.post("/add", async (req, res) => {
   const { user_email, product_no, product_price, option_no, option_price, product_quantity } = req.body;
   const key = `cart:${user_email}`;

   await redisClient.hSet(key, `product:${product_no}`, JSON.stringify({
      product_price,
      option_no,
      option_price,
      quantity: product_quantity,
      cart_date: new Date().toISOString()
   }));

   res.json({ success: true });
});

// 장바구니 조회
router.get("/:user_email", async (req, res) => {
   const key = `cart:${req.params.user_email}`;
   const cartItems = await redisClient.hGetAll(key);
   res.json({ cart: Object.entries(cartItems).map(([_, value]) => JSON.parse(value)) });
});

// 장바구니 수량 변경
router.put("/update", async (req, res) => {
   const { user_email, product_no, new_quantity } = req.body;
   const key = `cart:${user_email}`;

   let cartItem = await redisClient.hGet(key, `product:${product_no}`);
   if (!cartItem) return res.status(404).json({ success: false, message: "상품이 장바구니에 없음" });

   cartItem = JSON.parse(cartItem);
   cartItem.quantity = new_quantity;

   await redisClient.hSet(key, `product:${product_no}`, JSON.stringify(cartItem));

   res.json({ success: true });
});


// 장바구니 상품 삭제
router.delete("/remove", async (req, res) => {
   const { user_email, product_no } = req.body;
   const key = `cart:${user_email}`;
   await redisClient.hDel(key, `product:${product_no}`);
   res.json({ success: true });
});

// 장바구니 전체 삭제
router.delete("/clear", async (req, res) => {
   const key = `cart:${req.body.user_email}`;
   await redisClient.del(key);
   res.json({ success: true });
});



module.exports = router;