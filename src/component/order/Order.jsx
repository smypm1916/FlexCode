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
  // const [checkedProducts, setCheckedProducts] = useState([]);
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
  const openModal = () => setIsCartModalOpen(true);
  const closeModal = () => setIsCartModalOpen(false);
  const imgPath = import.meta.env.VITE_IMG_PATH;
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const goToPayment = () => navigate('/order-complete');
  const goToHome = () => navigate('/');
  const { cartItems, loading, fetchCart, updateCart, removeFromCart } = useCart();

  const API_BASE_URL = "http://localhost:8080/api";


  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsCartModalOpen(true);
  };
  const closeEditModal = () => {
    // setSelectedProduct(null);
    setIsCartModalOpen(false);
  };

  const handleCheckboxChange = (e) => {
    setIsSame(e.target.checked);
    if (e.target.checked) {
      setReceiveInfo({ ...deliveryInfo });
    }
  };

  const quantityHandler = () => {
    setCartItems((prev) => {
      prev.map((opt) => {
        opt.OPTION_NO === OPTION_NO ? { ...opt, quantity } : opt
      });
    });
  };

  // const onRemove = (productKey) => {
  //   removeFromCart(productKey);
  // };

  // 장바구니 비우기
  const clearCart = async () => {
    const token = localStorage.getItem('token');
    const clearAllCart = axios.delete(`${API_BASE_URL}/cart/clear`, {
      withCredentials: true,
      headers: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
    await fetchCart();
  };

  // 장바구니 수량 수정

  // 장바구니 옵션 변경/삭제


  useEffect(() => {
    console.log(tempOrderId);
    fetchCart();
  }, [tempOrderId]);

  const totalPrice = cartItems.reduce((sum, item) => {
    const productPrice = item.product_price || 0;
    const optionPrice = item.option_price || 0;
    return sum + (productPrice + optionPrice) * item.quantity;
  }, 0);

  return (
    <div>
      <div>

        <h1>주문 번호 : {tempOrderId}</h1>
        {/* 주문 상품 */}
        <div>주문상품</div>
        {loading && <p>...LOADING...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && cartItems.length > 0 && (<CheckedProduct mode='order' cartItems={cartItems} updateCart={updateCart} removeFromCart={removeFromCart} />)}
        {!loading && cartItems.length === 0 && <p>장바구니가 비어있습니다</p>}
      </div>

      {/* 옵션 변경 모달 */}
      {isCartModalOpen && (
        <ReactModal isOpen={isCartModalOpen} onRequestClose={closeModal}>
          {selectedProduct && (
            <CheckedProduct
              cartItems={cartItems}
              removeFromCart={removeFromCart(productKey)}
            />
          )}
        </ReactModal>)
      }
      {/* 합계 금액 */}
      <div>
        {/* <p> */}
        {/* 합계 금액 : {cartItems.reduce((sum, item) => sum + (item.product_price + item.option_price) * item.quantity, 0)} 원 */}
        <p>합계 금액 : {totalPrice} 원</p>
        {/* </p> */}
      </div>
      {!loading && cartItems.length === 0 && <p>장바구니가 비어있습니다.</p>}

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
