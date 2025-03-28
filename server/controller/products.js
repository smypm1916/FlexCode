const productService = require('../services/products');

// 전체 상품 조회
async function getAllProducts(req, res) {
   res.setHeader("Content-Type", "application/json; charset=utf-8");
   const page = Math.max(Number(req.query.page) || 1, 1);
   const limit = Math.max(Number(req.query.limit) || 9, 1);
   const keyword = req.query.keyword || "";
   const category = req.query.category || "";

   try {
      const productsLists = await productService.getAllProducts(page, limit, keyword, category);

      const hasMore = productsLists.length === limit;

      res.status(200).json({
         success: true,
         data: productsLists,
         hasMore,
      });
   } catch (error) {
      console.error('controller error', error);
      res.status(500).json({ success: false, message: error.message });
   }
}

// async function getAllProducts(req, res) {

//    const page = Math.max(Number(req.query.page) || 1, 1);
//    const limit = Math.max(Number(req.query.limit) || 9, 1);
//    try {
//       const productsLists = await productService.getAllProducts(page, limit);
//       res.status(200).json({ success: true, data: productsLists });
//    } catch (error) {
//       console.error('controller error', error);
//       res.status(500).json({ success: false, message: error.message });
//    }
// }

// 단일 상품 조회
async function getProductDetail(req, res) {
   res.setHeader("Content-Type", "application/json; charset=utf-8");
   try {
      const productDetail = await productService.getProductDetail(req.params.product_no);
      if (!req.params.product_no) {
         return res.status(400).json({ success: false, message: "product_no 필요" });
      }
      if (!productDetail) {
         return res.status(404).json({ success: false, message: "상품 정보 없음" });
      }
      res.status(200).json({ success: true, data: productDetail });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
};

// 카테고리별 상품 조회 
async function getCategories(req, res) {
   try {
      const productCategories = await productService.getCategories();
      res.status(200).json({ success: true, data: productCategories });
   }
   catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
}

// 상품 등록
async function regProduct(req, res) {
   try {
      const productRegister = await productService.regProduct(req.body);
      console.log(req.body);
      res.status(201).json({ success: true, message: 'product insert success!!!' });
      return;
   }
   catch (error) {
      res.status(500).json({ success: false, message: error.message })
   }
};

// 상품 수정
async function updateProductByPk(req, res) {
   const { product_img } = req.body;
   const product_no = Number(req.params.product_no);

   console.log('req.params:', req.params);
   console.log('req.body:', req.body);
   console.log('product_no:', product_no);
   console.log('product_img:', product_img);


   if (!product_no || !product_img) {
      return res.status(400).json({
         success: false,
         message: '필수 데이터(product_no 또는 product_img)가 누락되었습니다.'
      });
   }

   try {
      const productUpdater = await productService.updateProductByPk(product_no, product_img);
      console.log(req.body);
      res.status(201).json({
         success: true, message: 'product update controller success'
      });
      return
   } catch (error) {
      res.status(500).json({ success: false, message: error.message })
   }
}

// 상품 삭제
async function deleteProductByPk(req, res) {
   try {
      const productDelete = await productService.deleteProductByPk(req.body);
      res.status(201).json({ success: true, message: 'product delete success!!!' });
      return;
   } catch (error) {
      res.status(500).json({ success: false, message: error.message })
   }
}

// async function updateProductByPk()

module.exports = { getAllProducts, getProductDetail, regProduct, deleteProductByPk, getCategories, updateProductByPk }