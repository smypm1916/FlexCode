import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../common/Button";
import Select from "../common/Select";

const ProductDetail = () => {
   const { id } = useParams(); // URL에서 `id` 값을 가져옴
   const [product, setProduct] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            const response = await axios.get(`URL`);
            setProduct(response.data);
         } catch (error) {
            setError(error);
         } finally {
            setLoading(false);
         }
      };
      fetchProduct();
   }, [id]);

   if (loading) return <div>Loading...</div>;
   return (
      <div>
         {/* 컨테이너 1 */}
         <div>
            {/* 이미지 */}
            <img src="REACT_APP_IMAGE_PATH/{path}" alt="" />

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
         </div>

         {/* 컨테이너 4 */}
         <div>
            {/* 리뷰??? */}
         </div>
      </div>
   );
};

export default ProductDetail;
