import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGetOrder } from "./MyPageAPI";
import { Order_Wrapper, User_Status_Row } from "../../style/Mypage_Style";
import { Text, Title } from "../../style/Product_Detail_Style";
import { Input_Wrapper } from "../../style/Common_Style";

const UserOrders = ({ email }) => {
  console.log("넘겨받은 이메일:", email);

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const imgPath = import.meta.env.VITE_IMG_PATH;

  const [productImgs, setProductImgs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGetOrder(email); // 데이터 가져오기
      console.log("요청 이메일:", email);
      console.log("받아온 데이터:", data);
      // JSON 문자열을 파싱해서 배열로 바꿔줌
      const parsed = data.rows.map((order) => ({
        ...order,
        ITEMS: JSON.parse(order.ITEMS),
      }));
      setOrders(parsed); // 상태 업데이트
      // 이미지 추출
      const productImages = parsed.map((order) => {
        // 첫번째 상품의 첫번째 이미지만 가져옴
        const firstItem = order.ITEMS[0];
        return firstItem.product_img.split("*")[0].trim(); // 첫번째 이미지만 추출
      });

      console.log("상품 이미지 : ", productImages);
      setProductImgs(productImages);
    };
    fetchData();
  }, [email]);

  return orders.length > 0 ? (
    <Order_Wrapper>
      <User_Status_Row className="borderBottom">
        <Title>나의 구매내역</Title>
        <Text
          className="more"
          onClick={() => {
            navigate("/userOrder-list", { state: { email } });
          }}
        >
          더보기
        </Text>
      </User_Status_Row>
      {orders.slice(0, 3).map((order, index) => (
        <Input_Wrapper
          className="flex userOrder"
          key={order.ORDER_NO}
          onClick={() =>
            navigate(`/userOrder_detail/${order.ORDER_NO}`, {
              state: { orders },
            })
          }
          style={{ border: "1px solid #ccc", margin: "20px", padding: "15px" }}
        >
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
                  src={`${imgPath}/${item.product_img}`}
                  alt={item.product_name}
                  width="150"
                  height="150"
                />
                <div style={{ marginLeft: "10px" }}>
                  {order.ITEMS.length > 1 ? (
                    <h4>
                      {order.ITEMS[0].product_name} 외 {order.ITEMS.length - 1}
                      개
                    </h4>
                  ) : (
                    <h4>{order.ITEMS[0].product_name}</h4>
                  )}
                </div>
              </li>
            ))}
          </ul>
          '
          <Order_Wrapper>
            <p>
              주문일자 :{" "}
              {new Date(order.ORDER_DATE).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
            <p>
              주문상태 : {order.ORDER_STATE === 0 ? "주문취소" : "주문완료"}
            </p>
            <p>총 금액: {order.TOTAL_PRICE.toLocaleString()}원</p>
          </Order_Wrapper>
        </Input_Wrapper>
      ))}
    </Order_Wrapper>
  ) : (
    <Order_Wrapper>
      <h2>나의 구매내역</h2>
      <p>구매내역이 없습니다.</p>
    </Order_Wrapper>
  );
};

export default UserOrders;
