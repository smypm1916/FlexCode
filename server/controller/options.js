const optionService = require('../services/options');

// 옵션 조회
async function
   getOptionProduct(req, res) {
   try {
      const optionDetail = await optionService.getOptionProduct(req.params.product_no);
      if (!req.params.product_no) {
         return res.status(400).json({ success: false, message: "product_no 필요" });
      }
      if (!optionDetail) {
         return res.status(404).json({ success: false, message: "옵션 정보 없음" });
      }
      res.status(200).json({ success: true, data: optionDetail });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
};


// 옵션 등록
async function regOption(req, res) {
   try {
      const optionRegister = await optionService.regOption(req.body);
      res.status(201).json({ success: true, message: 'option insert success!!!' });
      return;
   }
   catch (error) {
      res.status(500).json({ success: false, message: error.message })
   }
};


// 옵션 삭제
async function deleteOption(req, res) {
   try {
      const optionDelete = await optionService.deleteOption(req.body);
      res.status(201).json({ success: true, message: 'option delete success!!!' });
      return;
   } catch (error) {
      res.status(500).json({ success: false, message: error.message })
   }
}
module.exports = { getOptionProduct, regOption, deleteOption };