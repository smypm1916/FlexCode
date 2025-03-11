const express = require("express");
const router = express.Router();
const optionController = require('../controller/options');

// 옵션 선택
router.get("/:option_no", optionController.getOptionProduct);

// 옵션 등록
router.post("/reg", optionController.regOption);

// 옵션 삭제
router.delete("/del/:option_no", optionController.deleteOption);

module.exports = router;