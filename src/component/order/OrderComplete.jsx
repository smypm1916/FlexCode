import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../common/Button";
import {
  Button_Wrapper_100,
  Container_Style,
  Input_Wrapper,
  Title,
  Wrapper,
} from "../../style/Common_Style";
import { System_message } from "../../style/ProductLists_Style";
import { Text } from "../../style/Product_Detail_Style";

const OrderComplete = () => {
  const { orderNo } = useParams();
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:8080/api";

  const fetchOrderData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const res = await axios.get(`${API_BASE_URL}/order/receipt/${orderNo}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (res.data.success) {
        setOrderInfo(res.data.orderInfo);
        setOrderItems(res.data.orderItems);
      } else {
        setError("주문 정보를 불러올 수 없습니다.");
      }
    } catch (err) {
      setError("에러 발생: " + err.message);
    } finally {
      console.log("orderInfo : ", orderInfo);
      console.log("orderItems : ", orderItems);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [orderNo]);

  if (loading)
    return <System_message className="Inner_con">LOADING</System_message>;
  if (error)
    return <System_message className="Inner_con">{error}</System_message>;

  const totalPrice = orderInfo?.TOTAL_PRICE || 0;

  return (
    <Wrapper className="wrap" id="shipping">
      <Container_Style>
        <Title>주문이 완료되었습니다!</Title>

        <Input_Wrapper>
          <p>주문번호</p>
          <p>{orderNo}</p>
        </Input_Wrapper>
        <div>
          <Title>주문 상품</Title>
          {Array.isArray(orderItems) && orderItems.length > 0 ? (
            orderItems.map((item, idx) => (
              <div key={idx}>
                <Text>상품번호: {item.PRODUCT_NO}</Text>
                <p>옵션번호: {item.OPTION_NO}</p>
                <p>수량: {item.PRODUCT_QUANTITY}</p>
                <p>
                  가격:{" "}
                  {(item.PRODUCT_PRICE + item.OPTION_PRICE) *
                    item.PRODUCT_QUANTITY}{" "}
                  원
                </p>
              </div>
            ))
          ) : (
            <p>주문 상품 정보가 없습니다.</p>
          )}
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
        <Button_Wrapper_100>
          <Button btnTxt="돌아가기" onClick={() => navigate("/")} />
        </Button_Wrapper_100>
      </Container_Style>
    </Wrapper>
  );
};

export default OrderComplete;
