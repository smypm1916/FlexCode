const oracledb = require("../config/oracledb");

/**
 * user_account 테이블
 * user_email(pk)
 * user_nickname(unique)
 * user_password
 * user_name
 * user_addr
 * user_tel
 * user_profile
 */

const user_account = {
  tableName: "USER_ACCOUNT",
  columns: {
    user_email: "USER_EMAIL",
    user_nickname: "USER_NICKNAME",
    user_password: "USER_PASSWORD",
    user_name: "USER_NAME",
    user_addr: "USER_ADDR",
    user_tel: "USER_TEL",
    user_profile: "USER_PROFILE",
  },
};

module.exports = user_account;
