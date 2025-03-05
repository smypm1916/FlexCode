import React from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
   const navigate = useNavigate();
   return (
      <div>
         <div>
            {/* 주문 상품 */}
            <div></div>

            {/* 합계 금액 */}
            <div></div>

            {/* 주문자 정보 */}
            <div>
               <TextInput />

            </div>

            {/* 받는 사람 */}
            <div></div>

            {/* 결제/취소*/}
            <div>
               {/* 결제하기 */}
               <Button />
               {/* 돌아가기 */}
               <Button />
            </div>
         </div>
      </div>
   )
};

export default Order;