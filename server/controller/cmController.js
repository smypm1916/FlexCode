const cmService = require("../services/cmService");

const getPosts = async (req, res) => {
  const posts = await cmService.getPosts();
  console.log(posts);
  return res.json(posts);
};

const cmAdd = async (req, res) => {
  try {
    const { community_title, community_content } = req.body;
    const community_img = req.file ? req.file.fileName : null;

    const CmReg = await cmService.regPost({
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

module.exports = { getPosts, cmAdd };
