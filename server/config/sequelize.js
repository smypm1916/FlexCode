const { Sequelize } = require("sequelize");
require("dotenv").config();

// Sequelize TNS 설정
const sequelize = new Sequelize({
  dialect: "oracle",
  username: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  dialectOptions: {
    connectString: process.env.ORACLE_TNS_ALIAS, // TNS 접속 문자열
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: console.log, // SQL 로그 출력
});

// Sequelize 연결 테스트
const connectSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log("[Sequelize] Oracle Cloud DB (TNS) 연결 성공");
  } catch (error) {
    console.error("[Sequelize] TNS 연결 실패:", error);
  }
};

module.exports = { sequelize, connectSequelize };
