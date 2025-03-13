const cmService = require("../services/cmService");

const getPosts = async (req, res) => {
  const posts = await cmService.getPosts();
  console.log(posts);
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

// const searchPosts = async (req, res) = >{
//   try {

//   } catch (error) {

//   }

// };

module.exports = { getPosts, cmAdd };
