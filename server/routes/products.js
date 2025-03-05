const express = require("express");
const router = express.Router();
const productController = require('../controller/products');

// 모든 상품 조회
router.get("/", productController.getAllProducts);

// 특정 상품 조회
router.get("/:id", productController.getProductDetail);

// 상품 카테고리 조회
router.get("/category", productController.getCategories);

module.exports = router;
