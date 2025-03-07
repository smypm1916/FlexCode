const express = require("express");
const router = express.Router();
const userControlle = require("../controller/userController");

// 이메일 중복 확인
router.get("/check-email", userControlle.checkEmail);

module.exports = router;
