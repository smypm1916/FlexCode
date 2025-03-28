import axios from "axios";
import { jwtDecode } from "jwt-decode"; // 혹시 패키지 이름이 다르다면, 실제 import 구문에 맞춰주세요.
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
   Button_Wrapper_100,
   Container_Style,
   Input_Wrapper,
   Title,
   Wrapper,
} from "../../style/Common_Style";
import { System_message } from "../../style/ProductLists_Style";
import { Text } from "../../style/Product_Detail_Style";
import Button from "../common/Button";

// fetchGetOrderDetail는 MyPageAPI에서 가져오시는 기존 함수를 사용하시면 됩니다.
// import { fetchGetOrderDetail } from "../myPage/MyPageAPI";

const OrderComplete = () => {
   // -----------------------------------
   // [ 상태값 및 훅 설정 ]
   // -----------------------------------
   const navigate = useNavigate();
   const location = useLocation();
   const { orderNo } = useParams(); // 기존 id를 orderNo로 통일
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [email, setEmail] = useState("");       // 토큰에서 추출한 이메일
   const [userData, setUserData] = useState(null); // 회원 정보
   const [orderInfo, setOrderInfo] = useState(null); // 전체 주문 데이터
   const [orderItems, setOrderItems] = useState([]); // 주문 상품 목록
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   // 배송비 등 고정값 예시
   const SHIPPING_FEE = 2500;

   // -----------------------------------
   // [ useEffect - 토큰 해석 및 이메일 추출 ]
   // -----------------------------------
   useEffect(() => {
      const token = sessionStorage.getItem("token");
      if (token) {
         try {
            const decoded = jwtDecode(token);
            if (decoded.email) {
               setEmail(decoded.email);
            }
            setIsLoggedIn(true);
         } catch (err) {
            console.error("토큰 해석 실패:", err);
         }
      }
   }, []);

   // -----------------------------------
   // [ useEffect - userData 불러오기 ]
   // -----------------------------------
   useEffect(() => {
      if (email) {
         handleGetUser(email);
      }
   }, [email]);

   const handleGetUser = async (userEmail) => {
      try {
         const response = await axios.post("http://localhost:8080/api/users/getUser", {
            email: userEmail,
         });
         if (response.data.success && response.data.result.rows.length > 0) {
            setUserData(response.data.result.rows[0]);
         } else {
            console.log("회원 정보 조회 실패:", response.data.message);
         }
      } catch (error) {
         console.error("회원정보 조회 요청 실패:", error);
         setError("회원 정보를 불러오는 중 오류가 발생했습니다.");
      }
   };

   // -----------------------------------
   // [ useEffect - 주문 상세 데이터 불러오기 ]
   // -----------------------------------
   const fetchOrderData = async () => {
      setLoading(true);
      setError(null);
      try {
         // 1) 기존에 사용하시던 fetchGetOrderDetail 함수 사용 시:
         // const data = await fetchGetOrderDetail(orderNo);

         // 2) 또는 직접 axios로 가져오실 경우 (API 경로는 예시입니다):
         const res = await axios.get(`http://localhost:8080/api/order/detail/${orderNo}`, {
            withCredentials: true,
         });
         console.log(res)
         if (res.data.success) {
            const data = res.data.result; // 백엔드 응답에 맞게 구조 수정
            // ITEMS가 JSON 문자열이라면 파싱
            let parsedItems = data.ITEMS;
            if (typeof data.ITEMS === "string") {
               parsedItems = JSON.parse(data.ITEMS);
            }

            // 주문 정보/상품 목록을 상태에 저장
            setOrderInfo({
               ...data,
               ITEMS: parsedItems,
            });
            setOrderItems(parsedItems);
         } else {
            setError("주문 정보를 불러올 수 없습니다.");
         }
      } catch (err) {
         console.error("주문 상세 조회 에러:", err);
         setError("주문 상세 조회 중 오류가 발생했습니다.");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (orderNo) {
         fetchOrderData();
      }
   }, [orderNo]);

   // -----------------------------------
   // [ 주문취소 처리 ]
   // -----------------------------------
   const handleCancelOrder = async () => {
      if (!orderNo) return;
      try {
         const response = await axios.get(
            "http://localhost:8080/api/users/updateOrderState",
            {
               params: { order_no: orderNo },
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

   // -----------------------------------
   // [ 로딩/에러 처리 ]
   // -----------------------------------
   if (loading) return <System_message className="Inner_con">LOADING</System_message>;
   if (error) return <System_message className="Inner_con">{error}</System_message>;
   if (!orderInfo) return <System_message className="Inner_con">데이터가 없습니다.</System_message>;
   if (!userData) return <System_message className="Inner_con">회원 정보를 불러오는 중...</System_message>;

   // -----------------------------------
   // [ 총 합계 금액 (상품금액 + 옵션금액 + 배송비) ]
   // orderInfo.TOTAL_PRICE가 그대로 합계인지, 상품 합인지에 따라 조정
   // -----------------------------------
   const totalPrice = orderInfo?.TOTAL_PRICE || 0;
   const finalPrice = totalPrice + SHIPPING_FEE;

   // -----------------------------------
   // [ 화면 렌더링 ]
   // -----------------------------------
   return (
      <Wrapper className="wrap" id="shipping">
         <Container_Style>
            <Title>주문이 완료되었습니다!</Title>

            {/* 주문번호 */}
            <Input_Wrapper>
               <p>주문번호</p>
               <p>{orderNo}</p>
            </Input_Wrapper>

            {/* 주문 상품 정보 */}
            <div>
               <Title>주문 상품</Title>
               {Array.isArray(orderItems) && orderItems.length > 0 ? (
                  orderItems.map((item, idx) => (
                     <div key={idx} style={{ marginBottom: "20px" }}>
                        {/* 필요하다면 이미지 경로 설정 */}
                        {item.product_img && (
                           <img
                              src={`https://example.com/images/${item.product_img}`}
                              alt={item.product_name}
                              style={{ width: "100px", height: "100px" }}
                           />
                        )}

                        <Text>상품명: {item.product_name}</Text>
                        <p>옵션: {item.option_name}</p>
                        <p>수량: {item.product_quantity}개</p>
                        <p>
                           상품금액:{" "}
                           {Intl.NumberFormat("ko-KR").format(
                              item.product_price * item.product_quantity
                           )}
                           원
                        </p>
                        <p>
                           옵션금액:{" "}
                           {Intl.NumberFormat("ko-KR").format(
                              item.option_price * item.product_quantity
                           )}
                           원
                        </p>
                     </div>
                  ))
               ) : (
                  <p>주문 상품 정보가 없습니다.</p>
               )}
            </div>

            {/* 합계 금액 */}
            <div style={{ margin: "20px 0" }}>
               <h3>주문상품건수: {orderItems.length} 건</h3>
               <p>배송비: {Intl.NumberFormat("ko-KR").format(SHIPPING_FEE)} 원</p>
               <h3>
                  총 합계 금액: {Intl.NumberFormat("ko-KR").format(finalPrice)} 원
               </h3>
            </div>

            {/* 주문자 정보 */}
            <div style={{ marginBottom: "20px" }}>
               <h3>주문자 정보</h3>
               <p>받는사람: {userData.USER_NAME}</p>
               <p>배송지 주소: {userData.USER_ADDR}</p>
               <p>전화번호: {userData.USER_TEL}</p>
               <p>이메일: {userData.USER_EMAIL}</p>
            </div>

            {/* 결제/취소/목록 버튼들 */}
            <Button_Wrapper_100>
               <Button
                  type="button"
                  onClick={() => navigate('/')}
                  btnTxt="戻る"
               />
            </Button_Wrapper_100>
         </Container_Style>
      </Wrapper>
   );
};

export default OrderComplete;


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Button_Wrapper_100,
//   Container_Style,
//   Input_Wrapper,
//   Title,
//   Wrapper,
// } from "../../style/Common_Style";
// import { System_message } from "../../style/ProductLists_Style";
// import { Text } from "../../style/Product_Detail_Style";
// import Button from "../common/Button";

// const OrderComplete = () => {
//   const { orderNo } = useParams();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();
//   const [orderInfo, setOrderInfo] = useState([]);
//   const [orderItems, setOrderItems] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const API_BASE_URL = "http://localhost:8080/api";

//   const fetchOrderData = async () => {
//     setLoading(true);
//     try {
//       const token = sessionStorage.getItem('token');
//       const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
//       const res = await axios.get(`${API_BASE_URL}/user/getUserOrderDetail${orderNo}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
//       // const res = await axios.get(`${API_BASE_URL}/order/receipt/${orderNo}`, {
//       //   headers: { Authorization: `Bearer ${token}` },
//       //   withCredentials: true,
//       // });
//       if (res.data.success) {
//         setOrderInfo(res.data.orderInfo);
//         setOrderItems(res.data.orderItems);
//       } else {
//         setError('주문 정보를 불러올 수 없습니다.');
//       }
//     } catch (err) {
//       setError('에러 발생: ' + err.message);
//     } finally {
//       console.log('orderInfo : ', orderInfo);
//       console.log('orderItems : ', orderItems);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderData();
//   }, [orderNo]);

//   useEffect(() => {
//     const token = sessionStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   if (loading)
//     return <System_message className="Inner_con">LOADING</System_message>;
//   if (error)
//     return <System_message className="Inner_con">{error}</System_message>;

//   const totalPrice = orderInfo?.TOTAL_PRICE || 0;

//   return (
//     <Wrapper className="wrap" id="shipping">
//       <Container_Style>
//         <Title>주문이 완료되었습니다!</Title>

//         <Input_Wrapper>
//           <p>주문번호</p>
//           <p>{orderNo}</p>
//         </Input_Wrapper>
//         <div>
//           <Title>주문 상품</Title>
//           {Array.isArray(orderItems) && orderItems.length > 0 ? (
//             orderItems.map((item, idx) => (
//               <div key={idx}>
//                 <Text>상품번호: {item.PRODUCT_NO}</Text>
//                 <p>옵션번호: {item.OPTION_NO}</p>
//                 <p>수량: {item.PRODUCT_QUANTITY}</p>
//                 <p>
//                   가격:{" "}
//                   {(item.PRODUCT_PRICE + item.OPTION_PRICE) *
//                     item.PRODUCT_QUANTITY}{" "}
//                   원
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p>주문 상품 정보가 없습니다.</p>
//           )}
//         </div>
//         {/* 합계 금액 */}
//         <div>
//           <h3>합계 금액: {totalPrice.toLocaleString()} 원</h3>
//         </div>

//         {/* 주문자 정보 (간략화된 예시) */}
//         <div>
//           <h3>주문자 이메일</h3>
//           <p>{orderInfo?.USER_EMAIL}</p>
//         </div>

//         {/* 받는 사람 정보는 백엔드에 저장되어야 추가 가능 */}

//         {/* 결제/취소 */}
//         <Button_Wrapper_100>
//           <Button btnTxt="돌아가기" onClick={() => navigate("/")} />
//         </Button_Wrapper_100>
//       </Container_Style>
//     </Wrapper>
//   );
// };

// export default OrderComplete;
