const userService = require("../services/userService");

// 이메일 중복 체크
const checkEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "이메일을 입력하세요" });
    }
    const exists = await userService.checkEmail(email);
    if (exists) {
      return res.json({ exists: true, message: "이미 사용중인 이메일입니다." });
    } else {
      return res.json({ exists: false, message: "사용 가능한 이메일입니다." });
    }
  } catch (error) {
    console.error("이메일 중복 확인 오류", error);
    return res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

module.exports = { checkEmail };
