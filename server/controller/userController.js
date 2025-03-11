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

// 닉네임 중복 체크
const checkNickname = async (req, res) => {
  try {
    const { nickname } = req.query;
    if (!nickname) {
      return res
        .status(400)
        .json({ success: false, message: "닉네임을 입력하세요" });
    }
    const exists = await userService.checkNickname(nickname);
    if (exists) {
      return res.json({ exists: true, message: "이미 사용중인 닉네임입니다." });
    } else {
      return res.json({ exists: false, message: "사용 가능한 닉네임입니다." });
    }
  } catch (error) {
    console.error("닉네임 중복 확인 오류", error);
    return res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 회원가입
const registerUser = async (req, res) => {
  try {
    const userData = req.body; // 클라이언트에서 보낸 회원 데이터

    userData.user_profile = req.file
      ? req.file.filename
      : "default-profile.png";

    // 백엔드에서 받은 데이터 확인
    console.log("회원가입 요청 데이터:", userData);

    const result = await userService.registerUser(userData);

    if (!result) {
      throw new Error("회원가입 실패 - DB 오류");
    }

    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error("회원가입 오류:", error);
    return res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

module.exports = { checkEmail, checkNickname, registerUser };
