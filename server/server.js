require("dotenv").config();

const express = require("express");
const cors = require("cors"); // f->b cors 설정
const morgan = require("morgan"); // 로그 기록
const productRouter = require("./routes/products");
const userRouter = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
// app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

// 서버 실행 함수
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}에서 실행 중...`);
    });
  } catch (error) {
    console.error("서버 시작 중 오류 발생:", error);
  }
};

//서버 실행
startServer();
