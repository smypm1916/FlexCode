import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import CheckedProduct from './CheckedProduct'

const Cart = () => {
   const navigate = useNavigate();
   const toOrder = () => {
      // 가져갈 데이터 추가필요
      navigate('/order', {});
   }
   return (
      <div>
         <div className='cart-wrapper'>
            <div><h1>장바구니</h1></div>
            {/* 로그인 상태 아닐 경우 회원가입 버튼 출현 로직 */}
            <div>
               <h3>
                  주문을 진행하기 위해서는 로그인해야합니다.
               </h3>
            </div>

            {/* 장바구니 상품 리스트 */}
            <div>
               <CheckedProduct />
            </div>
            <div>
               <Button btnTxt="주문하기" onClick={toOrder} />
            </div>
         </div>
      </div>
   )
}

export default Cart