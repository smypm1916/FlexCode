const productModel = require('../models/product_info');

// 상품 리스트 조회
async function getAllProducts(page, limit, keyword, category) {
   try {
      return await productModel.getAllProducts(page, limit, keyword, category);
   } catch (error) {
      console.error('service error', error);
      throw error;
   }
}


// async function getAllProducts(page, limit) {
//    try {
//       console.log(`Fetching products for page(S): ${page}, limit: ${limit}`);
//       return await productModel.getAllProducts(page, limit);
//    } catch (error) {
//       console.error('service error', error);
//       throw error;
//    }
// }

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

// 카테고리 조회
async function getCategories() {
   try {
      console.log('Fetching products categories');
      return await productModel.getCategories();
   } catch (error) {
      console.error('category load error', error);
      throw error;
   }
}


module.exports = { getAllProducts, getProductDetail, regProduct, deleteProductByPk, getCategories };