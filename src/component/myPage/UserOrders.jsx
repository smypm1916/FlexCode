import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGetOrder } from "./MyPageAPI";

const UserOrders = ({ email }) => {
  console.log("넘겨받은 닉네임:", email);

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGetOrder(email); // 데이터 가져오기
      console.log("요청 이메일:", email);
      console.log("받아온 데이터:", data);
      // JSON 문자열을 파싱해서 배열로 바꿔줌
      const parsed = data.map((order) => ({
        ...order,
        ITEMS: JSON.parse(order.ITEMS),
      }));
      setOrders(parsed); // 상태 업데이트
    };
    fetchData();
  }, [email]);

  return orders.length > 0 ? (
    <div>
      <h2>나의 구매내역</h2>
      <h3
        onClick={() => {
          navigate("/userOrder-list", { state: { email } });
        }}
      >
        더보기
      </h3>
      {orders.slice(0, 3).map((order) => (
        <div
          key={order.ORDER_NO}
          style={{ border: "1px solid #ccc", margin: "20px", padding: "15px" }}
        >
          <p>
            주문일자 :{" "}
            {new Date(order.ORDER_DATE).toLocaleString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
          <p>주문상태 : {order.ORDER_STATE === 0 ? "주문완료" : "주문취소"}</p>
          <p>총 금액: {order.TOTAL_PRICE.toLocaleString()}원</p>
          <h4>주문상품</h4>
          <ul>
            {order.ITEMS.slice(0, 1).map((item, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={`/img/${item.product_img}`}
                  alt={item.product_name}
                  width="50"
                  height="50"
                />
                <div style={{ marginLeft: "10px" }}>
                  {order.ITEMS.length > 1 ? (
                    <p>
                      {order.ITEMS[0].product_name} 외 {order.ITEMS.length - 1}
                      개
                    </p>
                  ) : (
                    <p>{order.ITEMS[0].product_name}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  ) : (
    <h2>구매내역이 없습니다.</h2>
  );
};

export default UserOrders;
