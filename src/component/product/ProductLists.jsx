import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ProductLists = () => {
   // const [page, setPage] = useState(1); // 현재 페이지
   const [products, setProducts] = useState([]); // 상품 목록
   // const [loading, setLoading] = useState(false); // 로딩 상태
   const [error, setError] = useState(null); // 에러 상태
   const navigate = useNavigate();
   const imgPath = process.env.REACT_APP_IMG_PATH;

   // 상품 목록 조회
   const fetchProducts = async () => {
      try {
         const res = await axios.get('/api/products/');
         setProducts(res.data);
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
            {products.map((product) => (
               <div key={product.product_no} onClick={() => navigate(`/product/${product.product_no}`)}>
                  <img src={`${imgPath}/${product.product_img}`} alt={product.product_name} />
                  <div>
                     <h3>{product.product_name}</h3>
                     <p>{product.product_type}</p>
                     <p>{product.product_price} 원</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}


export default ProductLists;