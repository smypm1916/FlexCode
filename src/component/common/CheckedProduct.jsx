import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const CheckedProduct = ({ product, quantityHandler, options, onRemove }) => {
   const navigate = useNavigate();
   const countUp = (OPTION_NO, currentQuantity, maxQuantity) => {
      quantityHandler(OPTION_NO, Math.min(maxQuantity, currentQuantity + 1));
   };

   const countDown = (OPTION_NO, currentQuantity) => {
      quantityHandler(OPTION_NO, Math.max(1, currentQuantity - 1));
   };

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
};

export default CheckedProduct;