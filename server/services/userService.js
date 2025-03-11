const { executeQuery } = require("../config/oracledb");
const user_account = require("../models/user_account");

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

  const query = `insert into ${user_account.tableName} (${Object.values(
    user_account.columns
  ).join(
    ","
  )}) values (:user_email, :user_nickname, :user_password, :user_name, :user_addr, :user_tel, :user_profile)`;

  await executeQuery(query, {
    user_email,
    user_nickname,
    user_password,
    user_name,
    user_addr,
    user_tel,
    user_profile,
  });

  return { success: true, message: "회원가입이 완료되었습니다." };
};

module.exports = { checkEmail, checkNickname, registerUser };
