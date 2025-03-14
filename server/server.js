require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const productRouter = require("./routes/products");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const cmRouter = require("./routes/community");
const optionRouter = require("./routes/options");
const orderRouter = require("./routes/order");

const redis = require("redis");
const session = require("express-session");
const { createClient } = require("redis");
const { RedisStore } = require("connect-redis");
const path = require("path");
const { log } = require("console");
const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// 로그인된 유저의 토큰 관리
const activeTokens = new Set();

// 서버 재시작 시 모든 토큰 초기화
setTimeout(() => {
  activeTokens.clear();
  console.log("서버 재시작: 모든 로그인 관련 토큰이 초기화되었습니다.");
  io.emit("forceLogout"); // 모든 클라이언트 강제 로그아웃
}, 1000);

// WebSocket에서 JWT인증
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    return next(new Error("인증 토큰이 없습니다."));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    activeTokens.add(token);
    next();
  } catch (error) {
    return next(new Error("JWT 인증 실패"));
  }
});

// WebSocket 연결 이벤트
io.on("connection", (socket) => {
  console.log("클라이언트 연결됨:", socket.id);

  socket.on("disconnect", () => {
    console.log("클라이언트 연결 해제:", socket.id);
  });

  socket.on("forceLogout", () => {
    console.log("강제 로그아웃 이벤트 발생");
    io.emit("forceLogout");
  });
});

// redis세션
const redisClient = createClient({
  url: "redis://127.0.0.1",
}); // 기본 Redis 포트로 변경

redisClient
  .connect()
  .then(() => {
    console.log("Redis Connected");
  })
  .catch(console.error);

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
app.use(
  session({
    store: new RedisStore({ client: redisClient, disableTouch: true }),
    secret: "cart-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 }, // 30분 유지
  })
);

// 라우터 등록
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/post", cmRouter);
app.use("/api/options", optionRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// 서버 실행 함수
const startServer = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}에서 실행 중...`);
      console.log("WebSocket 서버 실행 완료!");
    });
  } catch (error) {
    console.error("서버 시작 중 오류 발생:", error);
  }
};

startServer();
