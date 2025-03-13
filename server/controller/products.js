const productService = require('../services/products');

// 전체 상품 조회
async function getAllProducts(req, res) {
   try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 9;
      const productsLists = await productService.getAllProducts(page, limit);
      res.status(200).json({ success: true, data: productsLists });
   } catch (error) {
      console.error('controller error', error);
      res.status(500).json({ success: false, message: error.message });
   }
}

// 단일 상품 조회
async function getProductDetail(req, res) {
   try {
      const productDetail = await productService.getProductDetail(req.params.product_no);
      if (!req.params.product_no) {
         // res.data object
         return res.status(400).json({ success: false, message: "product_no 필요" });
      }
      if (!productDetail) {
         return res.status(404).json({ success: false, message: "상품 정보 없음" });
      }
      res.status(200).json({ success: true, data: productDetail });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
};

// 카테고리별 상품 조회 
async function getCategories(req, res) {
   try {
      const productCategories = await productService.getCategories;
      res.status(200).json({ success: true, data: productCategories });
   }
   catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
}

// 상품 등록
async function regProduct(req, res) {
   try {
      const productRegister = await productService.regProduct(req.body);
      res.status(201).json({ success: true, message: 'product insert success!!!' });
      return;
   }
   catch (error) {
      res.status(500).json({ success: false, message: error.message })
   }
};

// 상품 삭제
async function deleteProductByPk(req, res) {
   try {
      const productDelete = await productService.deleteProductByPk(req.body);
      res.status(201).json({ success: true, message: 'product delete success!!!' });
      return;
   } catch (error) {
      res.status(500).json({ success: false, message: error.message })
   }
}

module.exports = { getAllProducts, getProductDetail, regProduct, deleteProductByPk, getCategories };