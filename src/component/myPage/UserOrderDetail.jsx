import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { fetchGetOrderDetail } from "./MyPageAPI";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Button from "../common/Button";
import {
  Button_Wrapper_100,
  Container_Style,
  Input_Wrapper,
  Wrapper,
} from "../../style/Common_Style";
import { Title } from "../../style/Modal_Style";
import { System_message } from "../../style/ProductLists_Style";
import { Order_Wrapper } from "../../style/Mypage_Style";

const UserOrderDetail = () => {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const location = useLocation();
  const { id } = useParams();
  const imgPath = import.meta.env.VITE_IMG_PATH;
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const [productImgs, setProductImgs] = useState(null);

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
      alert("API request failed.");
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
        // 이미지 추출
        const productImages = parsedData.ITEMS.map((item) => {
          // item.product_img가 '*'로 구분된 이미지들을 포함하므로, 이를 분리하여 배열로 반환
          return item.product_img.split("$").map((img) => img.trim());
        });

        console.log("상품 이미지 내역:", productImages);
        setProductImgs(productImages);
      }
    };
    if (id) fetchData(); // id가 있을 경우에만 fetchData 실행
  }, [id]);

  if (!order || !userData) {
    return <System_message className="Inner_con">Loading...</System_message>;
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
        alert("Your order has been cancelled.");
        navigate("/userOrder-list", { state: { email } });
      } else {
        alert("Failed to cancel the order.");
      }
    } catch (error) {
      console.error("주문상태 변경 요청 실패:", error);
      alert("Server Error");
    }
  };

  return (
    <Wrapper className="wrap marginTop" id="order">
      <Container_Style className="wrap">
        {/* 주문상품정보 */}
        <div>
          <h2>Order</h2>
          {order.ITEMS.map((item, index) => (
            <Order_Wrapper key={index} className="borderBottom">
              <Input_Wrapper>
                <img
                  src={`${imgPath}/${productImgs[index][0]}`} // 상품 이미지 경로
                  alt={item.product_name}
                  style={{ width: "100px", height: "100px" }}
                />
                <Order_Wrapper className="gap5px">
                  <h4>{item.product_name}</h4>
                  <Input_Wrapper className="flex">
                    <div>Option: {item.option_name}</div>
                    <div>Count: {item.product_quantity}</div>
                  </Input_Wrapper>
                  <Input_Wrapper className="flex">
                    <div>
                      Product Price:{" "}
                      {Intl.NumberFormat("ko-KR").format(
                        item.product_price * item.product_quantity
                      )}{" "}
                      円
                    </div>

                    <div>
                      Option Price:{" "}
                      {Intl.NumberFormat("ko-KR").format(
                        item.option_price * item.product_quantity
                      )}{" "}
                      円
                    </div>
                  </Input_Wrapper>
                </Order_Wrapper>
              </Input_Wrapper>
            </Order_Wrapper>
          ))}
        </div>
        {/* 총 주문 금액 */}
        <Order_Wrapper className="borderBottom">
          <h2>Total</h2>
          <Order_Wrapper className="gap5px">
            <div>Order Product Count: {order.ITEMS.length} </div>
            <div>Shipping Fee: 2,500円</div>
            <div>
              Total Price:{" "}
              {Intl.NumberFormat("ko-KR").format(order.TOTAL_PRICE + 2500)}円
            </div>
            <div>
              Order Date:{" "}
              {new Date(order.ORDER_DATE).toISOString().slice(0, 10)}
            </div>
          </Order_Wrapper>
        </Order_Wrapper>
        {/* 주문자 정보 */}
        <Order_Wrapper className="borderBottom">
          <h2>Customer Information</h2>
          <Order_Wrapper className="gap5px">
            <div>Name: {userData.USER_NAME}</div>
            <div>Address: {userData.USER_ADDR}</div>
            <div>Tel: {userData.USER_TEL}</div>
            <div>Email: {userData.USER_EMAIL}</div>
          </Order_Wrapper>
        </Order_Wrapper>
        {/* 주문취소/목록 버튼 */}
        <Button_Wrapper_100 className="grid2">
          {order.ORDER_STATE !== 0 ? (
            <>
              <Button
                type="button"
                onClick={handleCancelOrder}
                btnTxt={"Cancel Order"}
              />
            </>
          ) : null}
          <Button
            type="button"
            onClick={() => {
              navigate("/userOrder-list", { state: { email, orders } });
            }}
            btnTxt={"Back to List"}
          />
        </Button_Wrapper_100>
      </Container_Style>
    </Wrapper>
  );
};

export default UserOrderDetail;
