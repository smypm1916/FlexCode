import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const CheckedProduct = ({ product, options, count = 1, onRemove }) => {
   const [count, setCount] = useState(count);
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   const countUp = () => {
      setCount((prev) => prev + 1);
   }
   const countDown = () => {
      setCount((prev) => prev > 1 ? prev - 1 : 1);
   }

   return (
      <div>
         <div>
            <div>
               <h4 onClick={() => navigate(`/detail/${product.PRODUCT_NO}`)}>
                  {product.product_name}
               </h4>
            </div>
            <div>
               {options && options.length > 0 ? (
                  options.map((option, index) => (
                     <div key={index}>
                        <div>
                           <div>{option.option_title}</div>
                           <div>{option.option_price}</div>
                           <div>{count}</div>
                           <div>
                              <button onClick={countDown}>-</button>
                              <span style={{ margin: "0 10px" }}>{count}</span>
                              <button onClick={countUp}>+</button>
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
      </div >
   );
}

export default CheckedProduct;
