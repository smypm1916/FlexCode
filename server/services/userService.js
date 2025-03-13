const { executeQuery } = require("../config/oracledb");
const user_account = require("../models/user_account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 이메일 중복 체크 서비스
const checkEmail = async (email) => {
  const query = `select ${user_account.columns.user_email} from ${user_account.tableName} where ${user_account.columns.user_email} =:email`;
  const result = await executeQuery(query, [email]);
  return result.length > 0; // true: 1, false: 0
};

// 닉네임 중복 체크 서비스
const checkNickname = async (nickname) => {
  const query = `select ${user_account.columns.user_nickname} from ${user_account.tableName} where ${user_account.columns.user_nickname} =:nickname`;
  const result = await executeQuery(query, [nickname]);
  return result.length > 0;
};

// 회원가입
const registerUser = async (userData) => {
  const {
    user_email,
    user_nickname,
    user_password,
    user_name,
    user_addr,
    user_tel,
    user_profile,
  } = userData;

  // 비밀번호를 해싱(bcrypt 사용)
  const saltRounds = 10; // 솔트 값(보안 강화)
  const hashedPassword = await bcrypt.hash(user_password, saltRounds);

  console.log("해싱된 비밀번호:", hashedPassword);

  const query = `insert into ${user_account.tableName} (${Object.values(
    user_account.columns
  ).join(
    ","
  )}) values (:user_email, :user_nickname, :user_password, :user_name, :user_addr, :user_tel, :user_profile)`;

  await executeQuery(query, {
    user_email,
    user_nickname,
    user_password: hashedPassword,
    user_name,
    user_addr,
    user_tel,
    user_profile,
  });

  return { success: true, message: "회원가입이 완료되었습니다." };
};

// 로그인
const loginUser = async (email, password) => {
  try {
    console.log("로그인 시도-이메일:", email);
    // 유저 이메일로 DB 조회
    const query = `select ${user_account.columns.user_email}, ${user_account.columns.user_password}, ${user_account.columns.user_profile}, ${user_account.columns.user_nickname} from ${user_account.tableName} where ${user_account.columns.user_email} = :email`;
    const result = await executeQuery(query, [email]);

    console.log("로그인 DB 조회 결과:", result);

    // 이메일 존재 여부 확인
    if (result.length === 0) {
      console.log("로그인 실패: 등록되지 않은 이메일");
      return { success: false, message: "등록되지 않은 이메일입니다." };
    }

    const user = result[0];
    const getPassword = user.USER_PASSWORD;

    // 비밀번호 비교
    const pwMatch = await bcrypt.compare(password, getPassword);
    console.log("비밀번호 비교 결과:", pwMatch);
    if (!pwMatch) {
      console.log("로그인 실패: 비밀번호 불일치");
      return { success: false, message: "비밀번호가 일치하지 않습니다." };
    }

    // JWT 토큰 발급
    const token = jwt.sign(
      {
        email: user.USER_EMAIL,
        profile: user.USER_PROFILE,
        nickname: user.USER_NICKNAME,
      },
      process.env.JWT_SECRET || "your_secret_key", // 환경변수(env)에서 JWT_SECRET 가져옴
      { expiresIn: "1h" } // 토큰 유효시간 => 1시간
    );

    console.log("JWT 토큰 발급 성공:", token);

    return { success: true, token, profile: user.USER_PROFILE };
  } catch (error) {
    console.error("로그인 서비스 오류:", error);
    throw new Error("로그인 처리 중 오류가 발생했습니다.");
  }
};

const findId = async (name, tel) => {
  try {
    console.log("이메일 찾기 조건 이름, 전화번호:", name, tel);
    const query = `select user_email from user_account where user_name = :name and user_tel = :tel`;
    const result = await executeQuery(query, { name, tel });

    console.log("이메일찾기 DB 조회 결과:", result);

    // 이메일 존재 여부 확인
    if (result.length === 0) {
      console.log("로그인 실패: 등록되지 않은 이메일");
      return { success: false, message: "등록되지 않은 이메일입니다." };
    }

    const user_email = result;
    return { success: true, user_email };
  } catch (error) {
    console.error("이메일 찾기 서비스 오류:", error);
    throw new Error("이메일 찾기 처리 중 오류가 발생했습니다.");
  }
};

module.exports = { checkEmail, checkNickname, registerUser, loginUser, findId };
