const express = require("express");
const router = express.Router();
const cmController = require("../controller/cmController");
const upload = require("../middleware/multer");

//페이징
router.get("/paging", cmController.getPosts);

// 글 등록
router.post("/write", upload.single("community_img"), cmController.cmAdd);

// 글 서치
// router.get("/search", cmController.searchPosts);

module.exports = router;
