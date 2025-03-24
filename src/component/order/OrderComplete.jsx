import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../common/Button';

const OrderComplete = () => {
   const navigate = useNavigate();
   const { tempOrderId } = useParams();
   const [orderInfo, setOrderInfo] = useState(null);
   const [orderItems, setOrderItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const API_BASE_URL = "http://localhost:8080/api";

   useEffect(() => {
      const fetchOrderData = async () => {
         try {
            const res = await axios.get(`${API_BASE_URL}/order/detail/${tempOrderId}`, {
               withCredentials: true,
            });
            if (res.data.success) {
               setOrderInfo(res.data.orderInfo);
               setOrderItems(res.data.orderItems);
            } else {
               setError('주문 정보를 불러올 수 없습니다.');
            }
         } catch (err) {
            setError('에러 발생: ' + err.message);
         } finally {
            setLoading(false);
         }
      };

      fetchOrderData();
   }, [tempOrderId]);

   if (loading) return <p>로딩 중...</p>;
   if (error) return <p>{error}</p>;

   const totalPrice = orderInfo?.TOTAL_PRICE || 0;

   return (
      <div>
         <h1>주문이 완료되었습니다! 주문번호: {orderInfo?.ORDER_NO}</h1>

         {/* 주문 상품 */}
         <div>
            <h2>주문 상품</h2>
            {orderItems.map((item, idx) => (
               <div key={idx}>
                  <p>상품번호: {item.PRODUCT_NO}</p>
                  <p>옵션번호: {item.OPTION_NO}</p>
                  <p>수량: {item.PRODUCT_QUANTITY}</p>
                  <p>가격: {(item.PRODUCT_PRICE + item.OPTION_PRICE) * item.PRODUCT_QUANTITY} 원</p>
               </div>
            ))}
         </div>

         {/* 합계 금액 */}
         <div>
            <h3>합계 금액: {totalPrice.toLocaleString()} 원</h3>
         </div>

         {/* 주문자 정보 (간략화된 예시) */}
         <div>
            <h3>주문자 이메일</h3>
            <p>{orderInfo?.USER_EMAIL}</p>
         </div>

         {/* 받는 사람 정보는 백엔드에 저장되어야 추가 가능 */}

         {/* 결제/취소 */}
         <div>
            <Button btnTxt="돌아가기" onClick={() => navigate('/')} />
         </div>
      </div>
   );
};

export default OrderComplete;