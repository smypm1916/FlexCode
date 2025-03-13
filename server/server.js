require("dotenv").config();

// const oracledb = require('./config/oracledb');
const express = require("express");
const cors = require("cors"); // f->b cors 설정
const morgan = require("morgan"); // 로그 기록
const productRouter = require("./routes/products");
const userRouter = require("./routes/user");
const cartRouter = require('./routes/cart');
const cmRouter = require("./routes/community");
const optionRouter = require("./routes/options");
const session = require('express-session');
const { createClient } = require('redis');
const RedisStore = require('connect-redis').default;
const orderRouter = require('./routes/order');

const app = express();
const PORT = process.env.PORT || 8080;

// redis세션
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: "cart-key",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 } // 30분 유지
}));


// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/post", cmRouter);
app.use("/api/options", optionRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

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

startServer();
