const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 저장할 폴더 경로 설정 (절대 경로 사용)
const uploadDir = path.join(__dirname, "../../src/assets/imgs");

// 폴더가 없으면 자동 생성
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // 이미지 저장 폴더
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // 확장자 추출
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName); // 파일명 설정(중복 방지)
  },
});

// 업로드 미들웨어 생성
const upload = multer({ storage: storage });

module.exports = upload;
