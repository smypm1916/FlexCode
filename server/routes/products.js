const express = require("express");
const router = express.Router();
const productController = require('../controller/products');

// 모든 상품 조회
router.get("/lists", productController.getAllProducts);

// 특정 상품 조회
router.get("/detail/:product_no", productController.getProductDetail);

// 상품 등록
router.post("/reg", productController.regProduct);

// 상품 삭제
router.delete("/del/:product_no", productController.deleteProductByPk);

// 상품 카테고리
router.get("/cat", productController.getCategories);

module.exports = router;