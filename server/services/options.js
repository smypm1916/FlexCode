const optionModel = require('../models/product_option');

// 옵션 리스트 조회
async function getOptionProduct(product_no) {
   try {
      return await optionModel.getOptionProduct(product_no);
   } catch (error) {
      console.error('option read service error', error);
      throw error;
   }
};

// 옵션 등록
async function regOption(optProduct) {
   try {
      return await optionModel.regOption(optProduct);
   } catch (error) {
      console.error('option reg service error', error);
      throw error;
   }
};

// 옵션 삭제
async function deleteOption(option_no) {
   try {
      return await optionModel.deleteOption(option_no);
   } catch (error) {
      console.error('option reg service error', error);
      throw error;
   }
};

module.exports = { getOptionProduct, regOption, deleteOption };