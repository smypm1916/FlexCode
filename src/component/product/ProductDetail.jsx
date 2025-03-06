import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../common/Button";
import Select from "../common/Select";

const ProductDetail = () => {
   const { id } = useParams(); // URL에서 `id` 값을 가져옴
   const [product, setProduct] = useState(null);
   // const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const navigate = useNavigate();
   const imgPath = import.meta.env.VITE_IMG_PATH;


   useEffect(() => {
      const fetchProduct = async () => {
         try {
            const response = await axios.get(`/api/products/${id}`);
            // const response = await axios.get('api/products/1');
            setProduct(response.data);
         } catch (error) {
            setError(error);
         } finally {
            setLoading(false);
         }
      };
      fetchProduct();
   }, []);

   if (loading) return <div>Loading...</div>;

   return (
      <div>
         {/* 컨테이너 1 */}
         <div>
            {/* 이미지 */}
            {/* <img src="REACT_APP_IMAGE_PATH/{path}" alt="" /> */}

            {/* 상품정보 */}
            <div>
               {/* 카테고리 */}
               <h3>{상품타입}</h3>
               <div>
                  <h2>{상품명}</h2>
                  <div>판매가 {판매가} 원</div>
                  <div>배송비 {배송비} 원</div>
                  <div>배송 지역 {배송지역}</div>
                  <div>배송 기간 {배송기간}</div>
                  <div>
                     {/* 옵션 */}
                     <div>
                        <Select />
                     </div>
                     {/* 수량 */}
                     <div>
                        <Select />
                     </div>
                  </div>
               </div>

               {/* 선택 정보 */}
               <div>
                  <div>
                     {/* 장바구니 추가, 별도 컴포넌트 */}
                  </div>
               </div>

               {/* 버튼 */}
               <div>
                  <Button />
                  <Button />
               </div>
            </div>
         </div>

         {/* 컨테이너 2 */}
         <div>
            {/* 상품 이미지 컴포넌트, 스크롤 이벤트 */}
            <img src="" alt="" />
         </div>

         {/* 컨테이너 3 */}
         <div>
            {/* 추가 정보 */}
            <div>
               <h3>배송 안내</h3>
               <p>배송</p><p>일반택배</p>
               <p>배송요금</p><p>무료배송</p>
               <p>도서산간 추가요금</p><p>3000원</p>
               <p>배송불가 지역</p><p>없음</p>
               <p>평균 배송기간</p><p>2일</p>
            </div>
            <div>
               <h3>교환/환불안내</h3>
               <p>반품배송비</p><p>3000원(최초 배송비 무료의 경우 6000원)</p>
               <p>교환배송비</p><p>5000원</p>
               <p>보내실 곳</p><p>서울특별시 종로구 종로12길 15</p>
            </div>
         </div>

         {/* 컨테이너 4 */}
         <div>
            {/* 리뷰??? */}
         </div>
      </div>
   );
};

export default ProductDetail;
