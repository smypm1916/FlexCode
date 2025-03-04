import React from "react";
import Button from "../common/Button";
import Select from "../common/Select";
const ProductDetail = () => {

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
