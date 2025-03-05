require("dotenv").config();

const express = require("express");
const { sequelize, connectSequelize } = require("./config/sequelize");
const { getConnection, executeQuery } = require("./config/oracledb");
const cors = require("cors"); // f->b cors 설정
const bodyParser = require("body-parser"); // json parsing
const morgan = require("morgan"); // 로그 기록
const productRouter = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// router
app.use("/api/products", productRouter);

// ✅ DB 연결 테스트 라우트
// app.get("/db-test", async (req, res) => {
//    try {
//       const rows = await executeQuery("SELECT table_name FROM all_tables WHERE owner = :owner", [
//          process.env.ORACLE_USER,
//       ]);
//       res.json({ success: true, tables: rows });
//    } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//    }
// });

// 서버 실행 함수
const startServer = async () => {
  try {
    await connectSequelize(); // Sequelize DB 연결 확인
    await sequelize.sync({ force: false }); // 테이블 동기화
    console.log("DB 테이블 동기화 완료");

    app.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}에서 실행 중...`);
    });
  } catch (error) {
    console.error("서버 시작 중 오류 발생:", error);
  }
};

//서버 실행
startServer();
