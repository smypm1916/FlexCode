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

    //Redis 토큰 추가

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
      console.log("조회 실패: 등록되지 않은 이메일");
      return { success: false, message: "등록되지 않은 이메일입니다." };
    }

    const user_email = result;
    return { success: true, user_email };
  } catch (error) {
    console.error("이메일 찾기 서비스 오류:", error);
    throw new Error("이메일 찾기 처리 중 오류가 발생했습니다.");
  }
};

const findPw = async (name, email) => {
  try {
    console.log("비밀번호(유저) 찾기 조건 이름, 이메일:", name, email);
    const query = `select * from user_account where user_name = :name and user_email = :email`;
    const result = await executeQuery(query, { name, email });

    console.log("비밀번호찾기 DB 조회 결과:", result);

    // 유저 존재 여부 확인
    if (result.length === 0) {
      console.log("조회 실패 : 등록되지 않은 이메일");
      return { success: false, message: "등록되지 않은 이메일입니다." };
    }

    return { success: true, result };
  } catch (error) {
    console.error("비밀번호 찾기 서비스 오류:", error);
    throw new Error("비밀번호(유저) 찾기 처리 중 오류가 발생했습니다.");
  }
};

const modifyPw = async (password, email) => {
  try {
    console.log("재설정 비밀번호:", password);
    console.log("재설정 대상 이메일:", email);

    // 비밀번호를 해싱(bcrypt 사용)
    const saltRounds = 10; // 솔트 값(보안 강화)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `update user_account set user_password = :password where user_email = :email`;
    const result = await executeQuery(query, {
      password: hashedPassword,
      email,
    });

    return { success: true, message: "비밀번호 재설정에 성공하였습니다." };
  } catch (error) {
    console.error("비밀번호 재설정 서비스 오류:", error);
    throw new Error("비밀번호 재설정 처리 중 오류가 발생했습니다.");
  }
};

const getUser = async (email) => {
  try {
    console.log("조회대상 이메일:", email);

    const query = `select * from user_account where user_email = :email`;
    const result = await executeQuery(query, { email });

    if (result.length === 0) {
      console.log("조회 실패");
      return { success: false, message: "회원정보 조회에 실패했습니다." };
    }

    return { success: true, result };
  } catch (error) {
    console.error("회원정보 조회 서비스 오류:", error);
    throw new Error("회원정보 조회 처리 중 오류가 발생했습니다.");
  }
};

// 회원정보 수정(이미지o)
const updateProfileWithImage = async (userData) => {
  const {
    user_email,
    user_name,
    user_nickname,
    user_tel,
    user_addr,
    user_profile,
  } = userData;

  const profileImg = user_profile.filename;

  const query = `update user_account set user_name = :user_name, user_nickname = :user_nickname, user_tel = :user_tel, user_addr = :user_addr, user_profile = :user_profile where user_email = :user_email`;

  await executeQuery(query, {
    user_email,
    user_name,
    user_nickname,
    user_tel,
    user_addr,
    user_profile: profileImg,
  });

  const updatedUserQuery = `select * from user_account where user_email = :email`;
  const updatedUser = await executeQuery(updatedUserQuery, {
    email: userData.user_email,
  });

  if (!updatedUser || updatedUser.length === 0) {
    throw new Error("회원정보 조회 실패");
  }

  const user = updatedUser[0]; // 최신 회원정보

  // JWT 토큰 발급
  const newToken = jwt.sign(
    {
      email: user.USER_EMAIL,
      profile: user.USER_PROFILE,
      nickname: user.USER_NICKNAME,
    },
    process.env.JWT_SECRET || "your_secret_key", // 환경변수(env)에서 JWT_SECRET 가져옴
    { expiresIn: "1h" } // 토큰 유효시간 => 1시간
  );

  return {
    success: true,
    message: "회원정보 수정이 완료되었습니다.",
    token: newToken,
  };
};

// 회원정보 수정(이미지x)
const updateProfile = async (userData) => {
  const { user_email, user_name, user_nickname, user_tel, user_addr } =
    userData;

  const query = `update user_account set user_name = :user_name, user_nickname = :user_nickname, user_tel = :user_tel, user_addr = :user_addr where user_email = :user_email`;

  await executeQuery(query, {
    user_email,
    user_name,
    user_nickname,
    user_tel,
    user_addr,
  });

  const updatedUserQuery = `select * from user_account where user_email = :email`;
  const updatedUser = await executeQuery(updatedUserQuery, {
    email: userData.user_email,
  });

  if (!updatedUser || updatedUser.length === 0) {
    throw new Error("회원정보 조회 실패");
  }

  const user = updatedUser[0]; // 최신 회원정보

  // JWT 토큰 발급
  const newToken = jwt.sign(
    {
      email: user.USER_EMAIL,
      profile: user.USER_PROFILE,
      nickname: user.USER_NICKNAME,
    },
    process.env.JWT_SECRET || "your_secret_key", // 환경변수(env)에서 JWT_SECRET 가져옴
    { expiresIn: "1h" } // 토큰 유효시간 => 1시간
  );

  return {
    success: true,
    message: "회원정보 수정이 완료되었습니다.",
    token: newToken,
  };
};

const deleteUserAccount = async (email) => {
  try {
    console.log("삭제대상 이메일:", email);

    const query = `delete user_account where user_email = :email`;

    const result = await executeQuery(query, email);

    console.log("쿼리 실행 결과:", result);

    if (result > 0) {
      return { success: true, result };
    } else {
      console.log("삭제 실패");
      return { success: false, message: "회원정보 삭제에 실패했습니다." };
    }
  } catch (error) {
    console.error("회원정보 삭제 서비스 오류:", error);
    throw new Error("회원정보 삭제 처리 중 오류가 발생했습니다.");
  }
};

module.exports = {
  checkEmail,
  checkNickname,
  registerUser,
  loginUser,
  findId,
  findPw,
  modifyPw,
  getUser,
  updateProfileWithImage,
  updateProfile,
  deleteUserAccount,
};
