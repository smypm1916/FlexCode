const express = require("express");
const router = express.Router();
const productController = require('../controller/products');

// 모든 상품 조회
router.get("/lists", productController.getAllProducts);

// 상품 카테고리 조회
// router.get("/category", productController.getCategories);

// 특정 상품 조회
router.get("/:product_no", productController.getProductDetail);

// 상품 등록
router.post("/reg", productController.regProduct);


module.exports = router;
