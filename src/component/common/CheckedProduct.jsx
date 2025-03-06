import React, { useState } from 'react';
import Button from './Button';
// 제품상세, 장바구니, 주문페이지에서 사용예정

const CheckedProduct = () => {
   const imgPath = process.env.REACT_APP_IMG_PATH;

   const [checkedProduct, setCheckedProduct] = useState(null);

   return (
      <div>
         <div>
            <div>
               {/* 상품명 */}
            </div>
            <div>
               {/* 상품옵션 */}
               <div>
                  <div>{옵션명}</div>
                  <div>{옵션가격}</div>
                  <div>{구매수량}</div>
               </div>
               {/* 상품삭제 */}
               <div>
                  <Button btnTxt="X" />
               </div>
            </div>
         </div>
      </div>
   )
}

export default CheckedProduct;