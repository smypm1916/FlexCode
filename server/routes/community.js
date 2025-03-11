const express = require("express");
const router = express.Router();
const cmController = require("../controller/cmController");

//페이징
router.get("/paging", cmController.getPosts);

// 글 등록
router.get("/write", cmController.cmAdd);

module.exports = router;
