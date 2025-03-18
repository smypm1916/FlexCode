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

// 이메일찾기
router.post("/findId", userController.findId);

// 비밀번호찾기(유저검색)
router.post("/findPw", userController.findPw);

// 비밀번호재설정
router.post("/modifyPw", userController.modifyPw);

// 회원정보조회
router.post("/getUser", userController.getUser);

// 회원정보수정(이미지o)
router.post(
  "/updateProfileWithImage",
  upload.single("user_profile"),
  userController.updateProfileWithImage
);

// 회원정보수정(이미지x)
router.post("/updateProfile", userController.updateProfile);

module.exports = router;
