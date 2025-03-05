import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';




const ProductLists = () => {
   const { page, setPage } = useState(1); // 현재 페이지
   const [products, setProducts] = useState([]); // 상품 목록
   const [loading, setLoading] = useState(false); // 로딩 상태
   const [error, setError] = useState(null); // 에러 상태
   const navigate = useNavigate();


   // 상품 목록 조회
   const fetchProducts = async () => {
      setLoading(true);
      try {
         const res = await axios.get(`URL`);
         if (!res.ok) {
            throw new Error('Failed to fetch products');
         }
         const json = await res.json();
      }
      catch (error) {
         console.log('====================================');
         console.log(error);
         console.log('====================================');
      }
      finally {
         setLoading(false);
      }
   }

   // // 스크롤 설정
   // useEffect(() => {
   //    const fetchProducts() = async () => {
   //    }
   // }, [page]);

   return (
      <div>
         <h1>Shopping</h1>
         Products
         {/* 상품 목록 렌더링 */}
         <div>
            {products.map((product) => {
               <div key={product.no} onClick={() => navigate(`/product/no=${product.no}`)}>
                  <img src={product.image} alt={product.name} />
                  <div>
                     <h3>{product.name}</h3>
                     <p>{product.type}</p>
                     <p>{product.price} 원</p>
                  </div>
               </div>
            })}
         </div>
      </div>
   )
}


export default ProductLists;