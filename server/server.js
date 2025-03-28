require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const productRouter = require("./routes/products");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const cmRouter = require("./routes/community");
const optionRouter = require("./routes/options");
const orderRouter = require("./routes/order");
const searchRouter = require("./routes/search");

const redis = require("redis");
const session = require("express-session");
const { createClient } = require("redis");
const { RedisStore } = require("connect-redis");
const path = require("path");
const { log } = require("console");
const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
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
  url: "redis://127.0.0.1:6379",
}); // 기본 Redis 포트로 변경
redisClient.on("error", (err) => console.error("Redis Client Error:", err));

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient, disableTouch: true }),
  secret: process.env.JWT_SECRET || "your_secret_key",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 30 * 60 * 1000 }, // 30분
});
// app.use(
//   session({
//     store: new RedisStore({ client: redisClient, disableTouch: true }),
//     secret: process.env.JWT_SECRET || "your_secret_key",
//     resave: false,
//     saveUninitialized: true,
//     rolling: true, // 로그인, 새로고침 시 세션유지
//     cookie: { maxAge: 30 * 60 * 1000 }, // 30분 유지
//   })
// );

const initRedisClient = async () => {
  try {
    await redisClient.connect();
    console.log("Redis Connected");

    const cartKeys = await redisClient.keys("cart:*");
    if (cartKeys.length > 0) {
      await redisClient.del(cartKeys);
      console.log("기존 장바구니 데이터 삭제 완료");
    } else {
      console.log("기존 장바구니 데이터 없음");
    }
  } catch (error) {
    console.error("Redis Connect Error:", error);
  }
};
// middleware

// Express 세션과 Socket.IO 통합
io.engine.use(sessionMiddleware);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
io.use(async (socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    return next(new Error("인증 토큰이 없습니다."));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const storedToken = await redisClient.get(`token:${decoded.email}`);
    if (storedToken !== token) {
      return next(new Error("JWT 토큰 불일치"));
    }
    socket.user = decoded;
    next();
  } catch (error) {
    return next(new Error("JWT 인증 실패"));
  }
});
  
// 정적 파일 제공(프로필 이미지 경로 설정)
// const imagePath = "C:/Users/codms/Documents/FlexCode/src/assets/imgs";
// console.log("프로필 이미지 절대경로:", imagePath);
// app.use("/uploads", express.static(imagePath));


// 라우터 등록
app.use(sessionMiddleware);
app.use("/api/order", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/post", cmRouter);
app.use("/api/options", optionRouter);
app.use("/api/cart", cartRouter(redisClient));
app.use("/api/search", searchRouter);

// 서버 실행 함수
const startServer = async () => {
  initRedisClient();
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
