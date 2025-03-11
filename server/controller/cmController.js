const cmService = require("../services/cmService");

const getPosts = async (req, res) => {
  const posts = await cmService.getPosts();
  console.log(posts);
  return res.json(posts);
};

const cmAdd = async (req, res) => {
  try {
    const CmReg = await cmService.regPost(req.body);
    res.status(201).json({ success: true, data: CmReg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getPosts, cmAdd };
