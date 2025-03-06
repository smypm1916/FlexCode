const express = require("express");
const router = express.Router();
const { User_account, sequelize } = require("../models"); // sequelize모델 불러옴

// 이메일 중복 확인 API
router.get("/check-email", async (req, res) => {
  try {
    const { email } = req.query; // 클라이언트에서 보낸 email 가져오기

    console.log("클라이언트에서 받아온 email : " + req.query.email);

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "이메일을 입력하세요." });
    }

    // 가져온 이메일이 DB 테이블에 존재하는지 확인
    const existingUser = await User_account.findOne({
      attributes: ["USER_EMAIL"], // user_email 조회
      where: { USER_EMAIL: email },
      raw: true, // Sequelize의 래핑된 객체가 아닌, 원본 데이터만 반환
    });

    console.log("DB에서 찾은 유저 정보 : ", existingUser);

    if (existingUser) {
      // true
      return res.json({
        exists: true,
        message: "이미 사용 중인 이메일입니다.",
      });
    } else {
      // false
      return res.json({ exists: false, message: "사용 가능한 이메일입니다." });
    }
  } catch (error) {
    console.error("이메일 중복 확인 오류 :", error);
    return res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
});

module.exports = router;
