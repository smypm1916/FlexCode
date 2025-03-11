const productModel = require('../models/product_info');

// async function getAllProducts() {
//    try {
//       const products = await productModel.getAllProducts();
//       return products;
//    } catch (error) {
//       console.error('service error', error);
//       throw error;
//    }
// };

// 상품 리스트 조회
async function getAllProducts(page, limit) {
   try {
      const products = await productModel.getAllProducts(page, limit);
      return products;
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
      console.error('service error', error);
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


// // const getByCategory = async()


module.exports = { getAllProducts, getProductDetail, regProduct, deleteProductByPk };