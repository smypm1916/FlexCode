require("dotenv").config();

const express = require("express");
const { getConnection, executeQuery } = require("./config/oracledb");

const app = express();

// ✅ DB 연결 테스트 라우트
app.get("/db-test", async (req, res) => {
   try {
      const rows = await executeQuery("SELECT table_name FROM all_tables WHERE owner = :owner", [
         process.env.ORACLE_USER,
      ]);
      res.json({ success: true, tables: rows });
   } catch (error) {
      res.status(500).json({ success: false, error: error.message });
   }
});

// ✅ 서버 실행
const PORT = 3000;
app.listen(PORT, async () => {
   console.log(`✅ 서버가 포트 ${PORT}에서 실행 중...`);

   // ✅ 서버 실행 시 DB 연결 확인
   const connection = await getConnection();
   if (connection) {
      console.log("✅ DB 연결 확인 완료");
      await connection.close();
   }
});
