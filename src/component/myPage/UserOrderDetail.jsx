import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { fetchGetOrderDetail } from "./MyPageAPI";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Button from "../common/Button";

const UserOrderDetail = () => {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const location = useLocation();
  const { id } = useParams();
  const imgPath = import.meta.env.VITE_IMG_PATH;
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setEmail(decoded.email);
    }
  }, []);

  useEffect(() => {
    if (email) {
      handleGetUser(email); // userEmail이 설정된 후에 호출
    }
  }, [email]); // userEmail이 변경될 때마다 호출

  const handleGetUser = async () => {
    const user_email = email;
    try {
      // 회원 정보 조회 API 요청
      const response = await axios.post(
        "http://localhost:8080/api/users/getUser",
        {
          email: user_email,
        }
      );
      console.log("회원 정보 조회 응답:", response.data.result.rows[0]);
      if (response.data.success) {
        setUserData(response.data.result.rows[0]);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("회원정보 조회 요청 실패:", error);
      alert("API 요청에 실패하였습니다.");
    }
  };

  useEffect(() => {
    if (location.state?.orders) {
      console.log("state에서 데이터 설정 완료");
      setOrders(location.state.orders);
    } else {
      console.log("location.state가 없음 -> 기본 데이터 사용");
      setOrders([]); // 기본값을 빈 배열로 설정
    }
  }, [location.state]);
  console.log("orders 데이터:", orders);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGetOrderDetail(id); // 데이터 가져오기
      console.log("요청 구매번호:", id);
      console.log("받아온 데이터:", data);
      if (data) {
        // JSON 문자열을 파싱해서 배열로 바꿔줌
        const parsedData = {
          ...data,
          ITEMS: JSON.parse(data.ITEMS), // ITEMS 파싱
        };
        setOrder(parsedData); // 상태 업데이트
      }
    };
    if (id) fetchData(); // id가 있을 경우에만 fetchData 실행
  }, [id]);

  if (!order || !userData) {
    return <div>Loading...</div>;
  }

  const handleCancelOrder = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/updateOrderState",
        {
          params: { order_no: id },
        }
      );
      if (response.data.success) {
        alert("주문이 취소되었습니다.");
        navigate("/userOrder-list", { state: { email } });
      } else {
        alert("주문취소 처리가 실패했습니다.");
      }
    } catch (error) {
      console.error("주문상태 변경 요청 실패:", error);
      alert("주문상태 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      {/* 주문상품정보 */}
      <div>
        <h2>Order</h2>
        <div>
          {order.ITEMS.map((item, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <img
                src={`${imgPath}/${item.product_img}`} // 상품 이미지 경로
                alt={item.product_name}
                style={{ width: "100px", height: "100px" }}
              />
              <div>상품명: {item.product_name}</div>
              <div>선택옵션: {item.option_name}</div>
              <div>수량: {item.product_quantity}</div>
              <div>
                상품금액:{" "}
                {Intl.NumberFormat("ko-KR").format(
                  item.product_price * item.product_quantity
                )}{" "}
                원
              </div>
              <div>
                옵션금액:{" "}
                {Intl.NumberFormat("ko-KR").format(
                  item.option_price * item.product_quantity
                )}{" "}
                원
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 총 주문 금액 */}
      <div style={{ marginBottom: "20px" }}>
        <div>
          <h2>Total</h2>
        </div>
        <div>주문상품건수: {order.ITEMS.length} 건</div>
        <div>배송비: 2,500원</div>
        <div>
          총 합계 금액:{" "}
          {Intl.NumberFormat("ko-KR").format(order.TOTAL_PRICE + 2500)}원
        </div>
      </div>
      {/* 주문자 정보 */}
      <div style={{ marginBottom: "20px" }}>
        <div>
          <h2>주문자정보</h2>
        </div>
        <div>받는사람: {userData.USER_NAME}</div>
        <div>배송지주소: {userData.USER_ADDR}</div>
        <div>전화번호: {userData.USER_TEL}</div>
        <div>이메일: {userData.USER_EMAIL}</div>
      </div>
      {/* 주문취소/목록 버튼 */}
      <div>
        {order.ORDER_STATE !== 1 ? (
          <>
            <Button
              type="button"
              onClick={handleCancelOrder}
              btnTxt={"주문취소"}
            />
          </>
        ) : null}
        <Button
          type="button"
          onClick={() => {
            navigate("/userOrder-list", { state: { email } });
          }}
          btnTxt={"목록으로"}
        />
      </div>
    </div>
  );
};

export default UserOrderDetail;
