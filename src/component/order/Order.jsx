import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../common/Button";
import CheckedProduct from "../common/CheckedProduct";
import { useCart } from '../common/useCart';
import ShippingAddress from "./ShippingAddress";

/*  
    1. 모든/일부 상품 선택
    2. 상품 옵션/수량 수정 ok
    3. 구매버튼 클릭 시 장바구니 정보 db로 전송 ok
*/


const Order = () => {
  const { tempOrderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const product = location.state?.product;
  const directOptions = location.state?.checkedProducts;
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


  const goToHome = () => navigate('/');
  const { cartItems, updateCartQuantity, loading, fetchCart, removeFromCart } = useCart();
  const [checkedProducts, setCheckedProducts] = useState(directOptions || []);


  const API_BASE_URL = "http://localhost:8080/api";

  // 결제 기능
  const goToPayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_BASE_URL}/order/complete`, {
        tempOrderId,
        from,
        checkedProducts,
        product,
        totalPrice,
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });

      if (response.data.success) {
        navigate(`/order-complete/${tempOrderId}`);
      } else {
        alert("결제 처리 실패: " + response.data.message);
      }
    } catch (error) {
      console.error("결제 오류:", error);
      alert("결제 중 오류가 발생했습니다.");
    }
  };

  // 옵션 삭제
  const onRemove = (OPTION_NO) => {
    return () => {
      setCheckedProducts((prev) =>
        prev.filter((opt) => opt.OPTION_NO !== OPTION_NO)
      );
    };
  };


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
    await axios.delete(`${API_BASE_URL}/cart/clear`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchCart();
  };

  useEffect(() => {
    if (from === "direct" && Array.isArray(directOptions)) {
      setCheckedProducts(directOptions);
      // 바로구매에서 온 경우: cartItems 대신 directOptions 사용
      console.log("바로구매로 전달된 상품:", product);
      console.log("선택된 옵션들:", directOptions);
    } else {
      // 일반 장바구니 주문
      fetchCart();
    }
  }, []);


  useEffect(() => {
    fetchCart();
  }, [tempOrderId]);

  useEffect(() => {
    console.log('cartItems changed', cartItems);
  }, [cartItems]);

  const totalPrice = from === "direct"
    ? checkedProducts?.reduce((sum, item) => {
      const productPrice = product?.PRODUCT_PRICE || 0;
      const optionPrice = item?.OPTION_PRICE || 0;
      return sum + (productPrice + optionPrice) * item.quantity;
    }, 0)
    : cartItems.reduce((sum, item) => {
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
      {!loading && from === "direct" && Array.isArray(checkedProducts) && checkedProducts.length > 0 ? (
        checkedProducts.map((item) => {
          const productKey = `product:${product.PRODUCT_NO}:option:${item.OPTION_NO}`;
          return (
            <div key={`direct:${item.OPTION_NO}`}>
              <p>상품명: {product.PRODUCT_NAME}</p>
              <p>옵션명: {item.OPTION_TITLE}</p>
              <p>수량: {item.quantity}</p>
              <p>금액: {(product.PRODUCT_PRICE + item.OPTION_PRICE) * item.quantity}원</p>
              <Button btnTxt="옵션/수량 수정" onClick={() => openEditModal({
                ...item,
                product_name: product.PRODUCT_NAME,
                product_price: product.PRODUCT_PRICE,
                product_no: product.PRODUCT_NO,
                option_title: item.OPTION_TITLE,
                option_price: item.OPTION_PRICE,
                option_no: item.OPTION_NO,
              })} />
              <Button btnTxt="옵션 삭제" onClick={onRemove(item.OPTION_NO)} />
            </div>
          );
        })
      ) : (!loading && cartItems.length > 0 ? (
        cartItems.map((item) => {
          const productKey = `product:${item.product_no}:option:${item.option_no}`;
          return (
            <div key={productKey}>
              <p>상품명: {item.product_name}</p>
              <p>옵션명: {item.option_title}</p>
              <p>수량: {item.quantity}</p>
              <p>금액: {(item.product_price + item.option_price) * item.quantity}원</p>
              <Button btnTxt="옵션 수정" onClick={() => openEditModal(item)} />
              <Button btnTxt="옵션 삭제" onClick={() => removeFromCart(productKey)} />
            </div>
          );
        })
      ) : (!loading && <p>장바구니가 비어있습니다.</p>))}


      {/* 합계 금액 */}
      <p>합계 금액 : {totalPrice.toLocaleString()} 원</p>

      {/* 옵션 변경 모달 */}
      <ReactModal isOpen={isCartModalOpen} onRequestClose={closeEditModal}>
        {selectedProduct && (
          <CheckedProduct style={{ flexDirection: 'row-reverse' }}
            mode='order'
            cartItems={[selectedProduct]}
            updateCartQuantity={(product_no, quantity) => {
              if (from === 'direct') {
                setCheckedProducts((prev) =>
                  prev.map((opt) =>
                    opt.OPTION_NO === selectedProduct.option_no ? { ...opt, quantity } : opt
                  )
                );
              } else {
                updateCartQuantity(product_no, quantity);
              }
            }}
            removeFromCart={(productKey) => {
              if (from === 'direct') {
                setCheckedProducts((prev) =>
                  prev.filter((opt) => `product:${product.PRODUCT_NO}:option:${opt.OPTION_NO}` !== productKey)
                );
                setIsCartModalOpen(false);
              } else {
                removeFromCart(productKey);
              }
            }}
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

      {/* 결제/취소 */}
      <div>
        <Button btnTxt='결제하기' onClick={goToPayment} />
        <Button btnTxt='돌아가기' onClick={goToHome} />
      </div>
    </div>
  );
};

export default Order;
