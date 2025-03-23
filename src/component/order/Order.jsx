import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../common/Button";
import CheckedProduct from "../common/CheckedProduct";
import { useCart } from '../common/useCart';
import ShippingAddress from "./ShippingAddress";

/*  
    1. 모든/일부 상품 선택
    2. 상품 옵션/수량 수정
    3. 구매버튼 클릭 시 장바구니 정보 db로 전송
*/


const Order = () => {
  const { tempOrderId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    base_address: '',
    detail_address: '',
    tel_first: '010',
    tel_mid: '',
    tel_last: '',
    email_id: '',
    email_domain: 'gmail.com',
  })
  const [receiveInfo, setReceiveInfo] = useState({ ...deliveryInfo });
  const [isSame, setIsSame] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const imgPath = import.meta.env.VITE_IMG_PATH;
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const goToPayment = () => navigate(`/order-complete/${tempOrderId}`);
  const goToHome = () => navigate('/');
  const { cartItems, updateCartQuantity, loading, fetchCart, removeFromCart } = useCart();

  const API_BASE_URL = "http://localhost:8080/api";


  const openEditModal = (item) => {
    setSelectedProduct(item);
    setIsCartModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedProduct(null);
    setIsCartModalOpen(false);
  };

  const handleCheckboxChange = (e) => {
    setIsSame(e.target.checked);
    if (e.target.checked) {
      setReceiveInfo({ ...deliveryInfo });
    }
  };

  // 장바구니 비우기
  const clearCart = async () => {
    const token = localStorage.getItem('token');
    const clearAllCart = axios.delete(`${API_BASE_URL}/cart/clear`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchCart();
  };


  useEffect(() => {
    fetchCart();
  }, [tempOrderId]);

  useEffect(() => {
    console.log('cartItems changed', cartItems);
  }, [cartItems]);

  const totalPrice = cartItems.reduce((sum, item) => {
    const productPrice = item.product_price || 0;
    const optionPrice = item.option_price || 0;
    return sum + (productPrice + optionPrice) * item.quantity;
  }, 0);

  return (
    <div>
      <h1>주문 번호 : {tempOrderId}</h1>
      {loading && <p>...LOADING...</p>}
      {error && <p>{error}</p>}

      {/* 장바구니 리스트 */}
      {!loading && cartItems.length > 0 ? (
        cartItems.map((item) => {
          const productKey = `product:${item.product_no}:option:${item.option_no}`;
          return (
            <div key={productKey}>
              <p>상품명: {item.product_name}</p>
              <p>옵션명: {item.option_title}</p>
              <p>수량: {item.quantity}</p>
              <p>금액: {(item.product_price + item.option_price) * item.quantity}원</p>
              <Button btnTxt="삭제" onClick={() => removeFromCart(productKey)} />
              <Button btnTxt="옵션/수량 수정" onClick={() => openEditModal(item)} />
            </div>
          );
        })
      ) : (!loading && <p>장바구니가 비어있습니다.</p>)}

      {/* 합계 금액 */}
      <p>합계 금액 : {totalPrice} 원</p>

      {/* 옵션 변경 모달 */}
      <ReactModal isOpen={isCartModalOpen} onRequestClose={closeEditModal}>
        {selectedProduct && (
          <CheckedProduct
            mode='order'
            cartItems={[selectedProduct]}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
          />
        )}
      </ReactModal>

      {/* 배송&수령 정보 */}
      <div>
        <ShippingAddress
          title="주문자 정보"
          data={deliveryInfo}
          setData={setDeliveryInfo}
        />
        <label>
          <input
            type="checkbox"
            checked={isSame}
            onChange={handleCheckboxChange}
          /> 주문자 정보와 동일
        </label>
        <ShippingAddress
          title="받는 사람"
          data={receiveInfo}
          setData={setReceiveInfo}
          isReadOnly={isSame}
        />
      </div>

      {/* 결제/취소*/}
      < div >
        <Button onClick={goToPayment} />
        <Button onClick={goToHome} />
      </div>
    </div>
  );
};

export default Order;
