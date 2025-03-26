const cmService = require("../services/cmService");

const getPosts = async (req, res) => {
  const posts = await cmService.getPosts();
  // console.log(posts);
  return res.json(posts);
};

const cmAdd = async (req, res) => {
  try {
    const { community_title, community_content, user_nickname } = req.body;
    const community_img = req.file ? req.file.filename : null;
    const CmReg = await cmService.regPost({
      user_nickname,
      community_title,
      community_content,
      community_img,
    });
    res.status(201).json({ success: true, data: CmReg });
  } catch (error) {
    console.error("작성 실패:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const detailPost = async (req, res) => {
  // console.log(req);
  const result = await cmService.detailPost(req.params.id);
  // console.log(result);
  return res.json(result);
};

const increaseViewCount = async (req, res) => {
  try {
    console.log("조회수 증가 요청 도착:", req.params.id);
    const id = req.params.id;
    await cmService.increaseViewCount(id);
    res.json(1);
  } catch (error) {
    console.error("조회수 증가 실패:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePost = async (req, res) => {
  const result = await cmService.deletePost(req.params.id);
  return res.json(result);
};
const updatePost = async (req, res) => {
  try {
    const { community_title, community_content, community_no, user_nickname } =
      req.body;
    const community_img = req.file ? req.file.filename : null;
    const CmUpdate = await cmService.updatePost({
      community_no,
      community_title,
      community_content,
      community_img,
      user_nickname,
    });
    res.status(201).json({ success: true, data: CmUpdate });
  } catch (error) {
    console.error("작성 실패:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPosts,
  cmAdd,
  detailPost,
  increaseViewCount,
  deletePost,
  updatePost,
};
