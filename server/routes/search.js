const express = require('express');
const router = express.Router();


// 검색 기능
router.get('/search', async (req, res) => {
   const keyword = req.query.keyword || '';
   try {
      const result = await executeQuery(
         `SELECT * FROM PRODUCTS WHERE PRODUCT_NAME LIKE '%' || :keyword || '%'`,
         [keyword]
      );
      res.json(result);
   } catch (err) {
      console.error("검색 오류:", err);
      res.status(500).json({ message: "검색 실패" });
   }
});

module.exports = router;
