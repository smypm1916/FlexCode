import React from "react";
import Button from "../layout/Button";
import Select from "../layout/Select";
const ProductDetail = () => {

   return (
      <div>
         {/* 컨테이너 1 */}
         <div>
            {/* 이미지 */}
            <div>img</div>

            {/* 상품정보 */}
            <div>
               <h3>{상품타입}</h3>
               <div>
                  <h3>{상품명}</h3>
                  <p>{상품설명}</p>
                  <div>
                     <div>
                        <Select />
                     </div>
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
