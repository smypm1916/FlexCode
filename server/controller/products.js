const productService = require('../services/products');

const getAllProducts = async (req, res) => {
   try {
      const productsLists = await productService.getAllProducts();
      res.json({ success: true, data: productsLists });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
};

const getProductDetail = async (req, res) => {
   try {
      const productDetail = await productService.getProductDetail(req.params.id);
      if (!req.params.id) {
         return res.status(400).json({ success: false, message: "product_no 필요" });
      }
      if (!productDetail) {
         return res.status(404).json({ success: false, message: "상품 정보 없음" });
      }
      res.json({ success: true, data: productDetail });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
};

const getCategories = async (req, res) => {
   try {
      const productCategories = await productService.getCategories();
      res.json({ success: true, data: productCategories });
   }
   catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
}

const regProduct = async (req, res) => {
   try {
      const productRegister = await productService.regProduct(req.body);
      res.status(201).json({ success: true, data: productRegister });
   }
   catch (error) {
      res.status(500).json({ success: false, message: error.message })
   }
}

module.exports = { getAllProducts, getProductDetail, getCategories, regProduct };