import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Title } from '../../style/Modal_Style'
import LoginModal from '../account/LoginModal'
import Button from './Button'

const Cart = ({ isOpen, onClose, CheckedProduct, goToOrder, user, cartItems }) => {
   // const user = JSON.parse(localStorage.getItem('user'));
   const [cartedProduct, setCartedProduct] = useState([]);
   const [totalPrice, setTotalPrice] = useState(0);
   const [error, setError] = useState(null);
   const imgPath = import.meta.env.VITE_IMG_PATH;
   const navigate = useNavigate();
   const toOrder = () => {
      // 가져갈 데이터 추가필요
      navigate('/order', {});
   }

   if (!isOpen) return null;

   return (
      <Modal>
         <div className='cart-wrapper'>
            <Title><h1>장바구니</h1></Title>
            {/* 로그인 상태 아닐 경우 회원가입 버튼 출현 로직 */}
            if(!user) ? <LoginModal /> : <p>쿠폰 적용은 결제할 때 확인가능합니다</p>

            {/* 장바구니 상품 리스트 */}
            <div>
               <CheckedProduct />
               {/* 가격 계산 */}
            </div>
            <div>
               <Button btnTxt="주문하기" onClick={goToOrder} />
            </div>
         </div>
      </Modal>
   )
}

export default Cart;