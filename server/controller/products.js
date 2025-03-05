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

module.exports = { getAllProducts, getProductDetail };