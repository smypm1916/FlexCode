import React from "react";
import { useNavigate } from "react-router-dom";
import ShippingAddress from "./ShippingAddress";

const Order = () => {
  const navigate = useNavigate();
  // const onRemove = () => {

  // }

  //  유저 데이터 받아오기

  // 장바구니 등록 상품 가져오기

  return (
    <div>
      <div>
        {/* 주문 상품 */}
        <div>주문상품</div>

        {/* 합계 금액 */}
        <div>합계금액</div>

        {/* 주문자 정보 */}
        <ShippingAddress />

        {/* // 받는 사람 */}
        <div>받는 사람</div>
        <ShippingAddress />

        {/* 결제/취소*/}
        < div >
          {/* 결제하기(orderComplete로 이동) */}
          < Button onClick={() => useNavigate("/order/:id")} />
          {/* 취소하기 */}
          <Button onClick={() => useNavigate("/")} />
        </div>
      </div>
    </div>
  );
};

export default Order;
