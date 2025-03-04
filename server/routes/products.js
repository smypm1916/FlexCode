const express = require("express");
const router = express.Router();

// 더미 데이터 
const products = [
   { id: 1, name: "상품 1", price: 10000, description: "상품 설명 1" },
   { id: 2, name: "상품 2", price: 20000, description: "상품 설명 2" },
];

// 모든 상품 조회
router.get("/", (req, res) => {
   res.json(products);
});

// 특정 상품 조회
router.get("/:id", (req, res) => {
   const product = products.find((p) => p.id === parseInt(req.params.id));
   if (!product) return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
   res.json(product);
});

module.exports = router;
