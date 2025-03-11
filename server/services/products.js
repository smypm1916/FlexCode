const productModel = require('../models/product_info');

// 상품 리스트 조회
async function getAllProducts(page, limit) {
   try {
      return await productModel.getAllProducts(page, limit);
   } catch (error) {
      console.error('service error', error);
      throw error;
   }
}

// 상품 상세
async function getProductDetail(product_no) {
   try {
      return await productModel.getProductDetail(product_no);
   } catch (error) {
      console.error('service error', error);
      throw error;
   }
};

// 상품 등록
async function regProduct(product) {
   try {
      return await productModel.regProduct(product);
   } catch (error) {
      console.error('product reg service error', error);
      throw error;
   }
};

// 상품 삭제
async function deleteProductByPk(product_no) {
   try {
      return await productModel.deleteProductByPk(product_no);
   } catch (error) {
      console.error('delete service error', error);
      throw error;
   }
};


async function getCategories() {
   try {
      return await productModel.getCategories;
   } catch (error) {
      console.error('category load error', error);
      throw error;
   }
}


module.exports = { getAllProducts, getProductDetail, regProduct, deleteProductByPk, getCategories };