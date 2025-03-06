const oracledb = require("oracledb");
require("dotenv").config();

// ✅ TNS_ADMIN 환경 변수 설정
process.env.TNS_ADMIN = process.env.TNS_ADMIN;

// ✅ Oracle DB 설정 (TNS 방식)
const dbConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_TNS_ALIAS, // TNS 방식 적용
};

// ✅ Oracle DB 연결 함수
async function getConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log("✅ Oracle DB (TNS) 연결 성공");
    return connection;
  } catch (error) {
    console.error("❌ Oracle DB (TNS) 연결 실패:", error);
    throw error;
  }
}

async function executeQuery(query, params = []) {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(query, params, {
      autoCommit: true,
    });
    return result.rows;
  } catch (error) {
    console.error("❌ 쿼리 실행 실패:", error);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { getConnection, executeQuery };
