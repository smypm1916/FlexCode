import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const CheckedProduct = ({ product, options, setSelectedOption, onRemove }) => {
   const navigate = useNavigate();

   // 수량 증가 (최대 재고 수량까지만 가능)
   const countUp = (option_no) => {
      setSelectedOption((prev) =>
         prev.map((option) =>
            option.option_no === option_no
               ? { ...option, quantity: Math.min(option.option_state, option.quantity + 1) } //  재고 초과 방지
               : option
         )
      );
   };

   // 수량 감소 
   const countDown = (option_no) => {
      setSelectedOption((prev) =>
         prev.map((option) =>
            option.option_no === option_no
               ? { ...option, quantity: Math.max(1, option.quantity - 1) } // 최소 1개 제한
               : option
         )
      );
   };

   return (
      <div>
         <div>
            <h4 onClick={() => navigate(`/detail/${product.PRODUCT_NO}`)}>
               {product.product_name}
            </h4>
         </div>
         <div>
            {options && options.length > 0 ? (
               options.map((option) => (
                  <div key={option.option_no}>
                     <div>
                        <div>{option.option_title}</div>
                        <div>{option.option_price}원</div>
                        <div>재고: {option.option_state}개</div> {/* 재고 표시 */}
                        <div>
                           <button onClick={() => countDown(option.option_no)}>-</button>
                           <span style={{ margin: "0 10px" }}>{option.quantity}</span>
                           <button onClick={() => countUp(option.option_no)}>+</button>
                        </div>
                     </div>
                     <div>
                        <Button btnTxt="X" onClick={() => onRemove(option.option_no)} />
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
