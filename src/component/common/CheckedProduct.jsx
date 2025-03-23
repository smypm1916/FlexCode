import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";


const CheckedProduct = ({ mode = "detail", product, quantityHandler, options, onRemove, cartItems, updateCart, removeFromCart }) => {
   const navigate = useNavigate();

   const countUp = (OPTION_NO, currentQuantity, maxQuantity) => {
      quantityHandler(OPTION_NO, Math.min(maxQuantity, currentQuantity + 1));
   };
   const countDown = (OPTION_NO, currentQuantity) => {
      quantityHandler(OPTION_NO, Math.max(1, currentQuantity - 1));
   };

   if (mode === 'detail') {
      return (
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
                              <button onClick={() => countDown(option.OPTION_NO, option.quantity)}>-</button>
                              <input
                                 type="number"
                                 min="1"
                                 max={option.OPTION_STATE}
                                 value={option.quantity}
                                 onChange={(e) => quantityHandler(option.OPTION_NO, parseInt(e.target.value, 10))}
                                 style={{ width: "50px", textAlign: "center", margin: "0 10px" }}
                              />
                              <button onClick={() => countUp(option.OPTION_NO, option.quantity, option.OPTION_STATE)}>+</button>
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
      return (
         <div style={{ border: "1px solid #999", padding: "8px" }}>
            {cartItems.length > 0 ? (
               cartItems.map((item, idx) => {
                  const productKey = `product:${item.product_no}:option:${item.option_no}`;
                  return (
                     <div key={productKey} style={{ marginBottom: 8 }}>
                        <p>상품명: {item.product_name}</p>
                        <p>옵션명: {item.option_title}</p>
                        <p>
                           수량:{" "}
                           <input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(e) => {
                                 const newQ = parseInt(e.target.value, 10);
                                 if (newQ > 0 && updateCart) {
                                    // 서버 동기화
                                    updateCart(item.product_no, newQ);
                                 }
                              }}
                              style={{ width: "50px", textAlign: "center" }}
                           />
                        </p>
                        <p>
                           금액: {(item.product_price + item.option_price) * item.quantity}원
                        </p>
                        {/* 삭제 */}
                        {removeFromCart && (
                           <Button btnTxt="삭제" onClick={() => removeFromCart(productKey)} />
                        )}
                     </div>
                  );
               })
            ) : (
               <p>장바구니가 비어있습니다.</p>
            )}
         </div>
      );
   }
};

export default CheckedProduct;