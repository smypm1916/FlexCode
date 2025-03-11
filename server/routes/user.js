const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// 이메일 중복 확인
router.get("/check-email", userController.checkEmail);

module.exports = router;
