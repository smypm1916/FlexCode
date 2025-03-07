const express = require("express");
const router = express.Router();
const { executeQuery } = require("../config/oracledb"); // DB쿼리 실행 함수 불러옴

// 이메일 중복 확인 API
router.get("/check-email", async (req, res) => {
  try {
    const { email } = req.query; // 클라이언트에서 보낸 email 가져오기
    console.log("클라이언트에서 받아온 email : " + email);

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "이메일을 입력하세요." });
    }

    // 가져온 이메일이 DB 테이블에 존재하는지 확인
    const query = `select user_email from user_account where user_email = :email`;
    const result = await executeQuery(query, [email]);

    console.log("DB에서 찾은 유저 정보 : ", result);

    if (result.length > 0) {
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
