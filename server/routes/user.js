const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const upload = require("../middleware/multer");

// 이메일 중복 확인
router.get("/check-email", userController.checkEmail);

// 닉네임 중복 확인
router.get("/check-nickname", userController.checkNickname);

// 회원가입처리
router.post(
  "/register",
  upload.single("user_profile"),
  userController.registerUser
);

// 로그인처리
router.post("/login", userController.loginUser);

module.exports = router;
