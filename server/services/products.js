const productModel = require('../models/product_info');

async function getAllProducts() {
   try {
      const products = await productModel.getAllProducts();
      return products;
   } catch (error) {
      console.error('service error', error);
      throw error;
   }
};

async function getProductDetail(product_no) {
   try {
      return await productModel.getProductDetail(product_no);
   } catch (error) {
      console.error('service error', error);
      throw error;
   }
};

async function regProduct(product) {
   try {
      return await productModel.regProduct(product);
   } catch (error) {
      console.error('service error', error);
      throw error;
   }
};


// const getByCategory = async()


module.exports = { getAllProducts, getProductDetail, regProduct };