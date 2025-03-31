import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button_Wrapper_100,
  Container_Style,
  Input_Wrapper,
  Wrapper,
} from "../../style/Common_Style";
import { Button_Pagination } from "../../style/Community_Style";
import { Title } from "../../style/Product_Detail_Style";
import Button from "../common/Button";
import { fetchGetOrder } from "./MyPageAPI";
import { Order_Wrapper } from "../../style/Mypage_Style";

const UserOrderList = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 한 페이지당 5개씩 표시
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

  // 현재 페이지에서 보여줄 데이터 필터링
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = orders.slice(indexOfFirstPost, indexOfLastPost);

  // 총 페이지 개수 계산
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // !!
  if (Array.isArray(orders) && orders.length === 0) {
    return <h2>구매내역이 없습니다.</h2>;
  }

  return (
    <Wrapper className="wrap marginTop" id="order">
      <Container_Style className="wrap">
        {/* 주문상품정보 */}
        <div>
          {order.ITEMS.map((item, index) => (
            <Order_Wrapper key={index} className="borderBottom">
              <h2>Order</h2>
              <Input_Wrapper>
                <img
                  src={`${imgPath}/${item.product_img}`} // 상품 이미지 경로
                  alt={item.product_name}
                  style={{ width: "100px", height: "100px" }}
                />
                <Order_Wrapper className="gap5px">
                  <h4>{item.product_name}</h4>
                  <Input_Wrapper className="flex">
                    <div>선택옵션: {item.option_name}</div>
                    <div>수량: {item.product_quantity}</div>
                  </Input_Wrapper>
                  <Input_Wrapper className="flex">
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
            <div>주문상품건수: {order.ITEMS.length} 건</div>
            <div>배송비: 2,500원</div>
            <div>
              총 합계 금액:{" "}
              {Intl.NumberFormat("ko-KR").format(order.TOTAL_PRICE + 2500)}원
            </div>
            <div>
              주문일자: {new Date(order.ORDER_DATE).toISOString().slice(0, 10)}
            </div>
          </Order_Wrapper>
        </Order_Wrapper>
        {/* 주문자 정보 */}
        <Order_Wrapper className="borderBottom">
          <h2>주문자정보</h2>
          <Order_Wrapper className="gap5px">
            <div>받는사람: {userData.USER_NAME}</div>
            <div>배송지주소: {userData.USER_ADDR}</div>
            <div>전화번호: {userData.USER_TEL}</div>
            <div>이메일: {userData.USER_EMAIL}</div>
          </Order_Wrapper>
        </Order_Wrapper>
        {/* 주문취소/목록 버튼 */}
        <Button_Wrapper_100 className="grid2">
          {order.ORDER_STATE !== 0 ? (
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
        </Button_Wrapper_100>
      </Container_Style>
    </Wrapper>
  );
};

export default UserOrderList;
