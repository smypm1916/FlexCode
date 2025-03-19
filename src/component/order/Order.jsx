import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import ShippingAddress from "./ShippingAddress";


/*  
    1. 모든/일부 상품 선택
    2. 상품 옵션/수량 수정
    3. 구매버튼 ok
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
  const openModal = () => setIsCartModalOpen(true);
  const closeModal = () => setIsCartModalOpen(false);
  const imgPath = import.meta.env.VITE_IMG_PATH;
  const navigate = useNavigate();
  const goToPayment = () => {
    navigate('/order-complete');
  };
  const goToHome = () => {
    navigate('/');
  };

  const API_BASE_URL = "http://localhost:8080/api";
  // const onRemove = () => {

  // }

  const handleCheckboxChange = (e) => {
    setIsSame(e.target.checked);
    if (e.target.checked) {
      setReceiveInfo({ ...orderInfo });
    }
  };

  //  유저 데이터 받아오기
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

  // 장바구니 수량 수정

  // 장바구니 옵션 변경

  // 장바구니 삭제

  // 장바구니 비우기

  // useEffect(() => {
  //   fetchCart();
  // }, []);


  return (
    <div>
      <div>
        {/* 주문 상품 */}
        <div>주문상품</div>
        <div>
          {/* <CheckedProduct /> */}

        </div>

        {/* 합계 금액 */}
        <div>
          합계
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

          <div>받는 사람</div>
          <ShippingAddress
            title="받는 사람"
            data={receiveInfo}
            setData={setReceiveInfo}
            isReadOnly={isSame}
          />
        </div>

        {/* 결제/취소*/}
        < div >
          {/* 결제하기(orderComplete로 이동) */}
          <Button onClick={goToPayment} />
          {/* 취소하기 */}
          <Button onClick={goToHome} />
        </div>
      </div>
    </div>
  );
};

export default Order;
