import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ProductLists = () => {
   // const [page, setPage] = useState(1); // 현재 페이지
   const [products, setProducts] = useState([]); // 상품 목록
   // const [loading, setLoading] = useState(false); // 로딩 상태
   const [error, setError] = useState(null); // 에러 상태
   const navigate = useNavigate();
   const imgPath = import.meta.env.VITE_IMG_PATH;


   // 상품 목록 조회
   const fetchProducts = async () => {
      try {
         const res = await axios.get('/api/products/');
         setProducts(res.data.data);
      }
      catch (error) {
         console.log(error);
         setError(error);
      }
   }

   // 스크롤 설정
   useEffect(() => {
      fetchProducts();
   }, []);

   return (
      <div>
         <h1>Shopping</h1>
         Products
         {/* 상품 목록 렌더링 */}
         <div>
            {Array.isArray(products) ? (
               products.map((product, i) => (
                  <div key={i} onClick={() => navigate(`/product/${product.PRODUCT_NO}`)}>
                     <img src={`${imgPath}/${product.PRODUCT_IMG}`} alt={product.PRODUCT_NAME} />
                     <div>
                        <h3>{product.PRODUCT_NAME}</h3>
                        <p>{product.PRODUCT_TYPE}</p>
                        <p>{product.PRODUCT_PRICE} 원</p>
                     </div>
                  </div>
               ))
            ) : (
               <p>데이터가 없습니다</p>
            )}
         </div>
      </div>
   )
}


export default ProductLists;