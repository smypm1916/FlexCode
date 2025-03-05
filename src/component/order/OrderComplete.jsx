import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderComplete = () => {
   const navigate = useNavigate();
   return (
      <div>
         <div>
            <div>
               {/* 주문 상품 */}
               <div></div>

               {/* 합계 금액 */}
               <div></div>

               {/* 주문자 정보 */}
               <div></div>

               {/* 받는 사람 */}
               <div></div>

               {/* 결제/취소*/}
               <div>
                  {/* 주문 취소 */}
                  <Button />
                  {/* 돌아가기 */}
                  <Button />
               </div>
            </div>
         </div>
      </div>
   )
};

export default OrderComplete;