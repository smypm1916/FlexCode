import React from 'react';
import Button from './Button';
// 제품상세, 장바구니, 주문페이지에서 사용예정

const CheckedProduct = ({ product_name, options, count }) => {
   const imgPath = import.meta.env.VITE_IMG_PATH;

   return (
      <>
         <div>
            <div>
               {/* 상품명 */}
               {product_name}
            </div>
            <div>
               {/* 상품옵션 */}
               <div>
                  <div>{옵션명}</div>
                  <div>{옵션가격}</div>
                  <div>{count}</div>
               </div>
               {/* 상품삭제 */}
               <div>
                  <Button btnTxt="X" />
               </div>
            </div>
         </div>
      </>
   )
}

export default CheckedProduct;