import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";


const CheckedProduct = ({ mode = "detail", product, quantityHandler, options, onRemove, cartItems, updateCartQuantity, removeFromCart }) => {
   const navigate = useNavigate();

   const countUp = (OPTION_NO, currentQuantity, maxQuantity) => {
      quantityHandler(OPTION_NO, Math.min(maxQuantity, currentQuantity + 1));
   };
   const countDown = (OPTION_NO, currentQuantity) => {
      quantityHandler(OPTION_NO, Math.max(1, currentQuantity - 1));
   };

   if (mode === 'detail') {
      return (
         // productInfo
         <div>
            <div>
               <h4 onClick={() => navigate(`/detail/${product.PRODUCT_NO}`)}>
                  {product.PRODUCT_NAME}
               </h4>
            </div>
            <div>
               {options.length > 0 ? (
                  options.map((option) => (
                     <div key={option.OPTION_NO}>
                        <div>
                           <div>{option.OPTION_TITLE}</div>
                           <div>{option.OPTION_PRICE}원</div>
                           <div>재고: {option.OPTION_STATE} 개</div>
                           <div>
                              <Button btnTxt="-" onClick={() => countDown(option.OPTION_NO, option.quantity)} />
                              <input
                                 type="number"
                                 min="1"
                                 max={option.OPTION_STATE}
                                 value={option.quantity}
                                 onChange={(e) => quantityHandler(option.OPTION_NO, parseInt(e.target.value, 10))}
                                 style={{ width: "50px", textAlign: "center", margin: "0 10px" }}
                              />
                              <Button btnTxt="+" onClick={() => countUp(option.OPTION_NO, option.quantity, option.OPTION_STATE)} />
                           </div>
                        </div>
                        <div>
                           <Button btnTxt="X" onClick={onRemove(option.OPTION_NO)} />
                        </div>
                     </div>
                  ))
               ) : (
                  <p>선택된 옵션이 없습니다.</p>
               )}
            </div>
         </div>
      );
   } else {
      // order
      if (!cartItems || cartItems.length === 0) {
         return <p>장바구니가 비어있습니다.</p>;
      }

      return (
         <div>
            <h2>옵션/수량 수정</h2>
            {cartItems.map((item) => {
               const productKey = `product:${item.product_no}:option:${item.option_no}`;
               return (
                  <div key={productKey} style={{ border: '1px solid #ccc', marginBottom: 8 }}>
                     <p>상품명: {item.product_name}</p>

                     {/* 수량 변경 */}
                     <p>
                        수량:{" "}
                        <input
                           type="number"
                           min={1}
                           value={item.quantity}
                           onChange={(e) => {
                              const newQ = parseInt(e.target.value, 10);
                              if (newQ > 0) {
                                 updateCartQuantity(item.product_no, newQ);
                              }
                           }}
                           style={{ width: "50px", textAlign: "center" }}
                        />
                     </p>

                     <p>총 금액: {(item.PRODUCT_PRICE + item.OPTION_PRICE) * item.quantity}원</p>

                     {/* 삭제 */}
                     <Button btnTxt="삭제" onClick={() => removeFromCart(productKey)} />
                  </div>
               );
            })}
         </div>
      );
   }
};

export default CheckedProduct;