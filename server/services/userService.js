const { executeQuery } = require("../config/oracledb");
const user_account = require("../models/user_account");

// 이메일 중복 체크 서비스
const checkEmail = async (email) => {
  const query = `select ${user_account.columns.user_email} from ${user_account.tableName} where ${user_account.columns.user_email} =:email`;
  const result = await executeQuery(query, [email]);
  return result.length > 0; // true: 1, false: 0
};

module.exports = { checkEmail };
