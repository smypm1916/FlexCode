const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const ALLOWED_IPS = ["192.168.0.10", "192.168.85.36", "168.126.63.1", "168.126.63.2"];

// ✅ IP 필터링 미들웨어
app.use((req, res, next) => {
   const clientIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
   console.log(`🔍 접속 시도 IP: ${clientIp}`);

   if (!ALLOWED_IPS.includes(clientIp)) {
      console.log(`🚨 차단된 IP: ${clientIp}`);
      return res.status(403).send("Access Forbidden");
   }

   next();
});

// ✅ Vite 서버로 프록시 설정 (기본 포트 5173)
app.use(
   "/",
   createProxyMiddleware({
      target: "http://localhost:5173",
      changeOrigin: true
   })
);

// ✅ Express 서버 실행 (포트 3001)
const PORT = 3001;
app.listen(PORT, () => {
   console.log(`✅ Proxy Server Running on http://localhost:${PORT}`);
});
