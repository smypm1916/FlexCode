import axios from "axios";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import CheckedProduct from "../common/CheckedProduct";
import ShippingAddress from "./ShippingAddress";


/*  
    1. 모든/일부 상품 선택
    2. 상품 옵션/수량 수정
    3. 구매버튼 클릭 시 장바구니 정보 db로 전송
*/


const Order = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    name: '',
    base_address: '',
    detail_address: '',
    tel_first: '010',
    tel_mid: '',
    tel_last: '',
    email_id: '',
    email_domain: 'gmail.com',
  })
  const [receiveInfo, setReceiveInfo] = useState({ ...orderInfo });
  const [isSame, setIsSame] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const openModal = () => setIsCartModalOpen(true);
  const closeModal = () => setIsCartModalOpen(false);
  const imgPath = import.meta.env.VITE_IMG_PATH;
  const navigate = useNavigate();
  const goToPayment = () => navigate('/order-complete');
  const goToHome = () => navigate('/');

  const API_BASE_URL = "http://localhost:8080/api";


  const openEditModal = () => {
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
      setReceiveInfo({ ...orderInfo });
    }
  };

  const quantityHandler = () => {
    setCheckedProducts((prev) => {
      prev.map((opt) => {
        opt.OPTION_NO === OPTION_NO ? { ...opt, quantity } : opt
      });
    });
  };

  // 장바구니 조회
  const fetchCart = async () => {
    try {
      setCartLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/cart/read`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCartItems(res.data.cart || []);
      setCartLoading(false);
    } catch (error) {
      console.error('cart load error', error);
      setError(error.response?.data?.message || error.message || "서버 오류가 발생했습니다");
      setCartLoading(false);
    }
  };

  // 장바구니 일부 삭제
  const onRemove = (product_no) => {
    try {
      const removeProduct = axios.delete(`${API_BASE_URL}/cart/remove`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('failed to remove products in cart', error);
      setError(error);
    }
  };

  // 장바구니 비우기
  const clearCart = () => {
    const token = localStorage.getItem('token');
    const clearAllCart = axios.delete(`${API_BASE_URL}/cart/clear`, {
      withCredentials: true,
      headers: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
  };

  // 장바구니 수량 수정

  // 장바구니 옵션 변경/삭제



  useEffect(() => {
    fetchCart();
  }, []);


  return (
    <div>
      <div>
        {/* 주문 상품 */}
        <div>주문상품</div>
        {cartLoading && <p>...LOADING...</p>}
        {error && <p>{error}</p>}
        {!cartLoading && !error && cartItems.length > 0 && (<CheckedProduct cartItems={cartItems} quantityHandler={quantityHandler} onRemove={onRemove} />)}
        {!cartLoading && cartItems.length === 0 && <p>장바구니가 비어있습니다</p>}
      </div>

      {/* 옵션 변경 모달 */}
      {isCartModalOpen && selectedProduct && (
        <ReactModal product={selectedProduct} closeModal={clearCart} fetchCart={fetchCart}>
          {/* 장바구니 수정 모달 */}
        </ReactModal>)
      }

      {/* 합계 금액 */}
      <div>
        <p>
          합계 금액 : {cartItems.reduce((sum, item) => sum + (item.product_price + item.option_price) * item.quantity, 0)} 원
        </p>
      </div>

      <div>
        <ShippingAddress
          title="주문자 정보"
          data={orderInfo}
          setData={setOrderInfo}
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
