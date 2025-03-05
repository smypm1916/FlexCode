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
      res.json({ success: true, data: productDetail });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
};

module.exports = { getAllProducts, getProductDetail };