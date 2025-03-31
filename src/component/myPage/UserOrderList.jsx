import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button_Wrapper_100,
  Container_Style,
  Input_Wrapper,
  Wrapper,
} from "../../style/Common_Style";
import { Button_Pagination } from "../../style/Community_Style";
import { Text, Title } from "../../style/Product_Detail_Style";
import Button from "../common/Button";
import { fetchGetOrder } from "./MyPageAPI";
import { Order_Wrapper, User_Status_Row } from "../../style/Mypage_Style";

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
        return firstItem.product_img.split("$")[0].trim(); // 첫번째 이미지만 추출
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

  if (Array.isArray(orders) && orders.length === 0) {
    return <h2>구매내역이 없습니다.</h2>;
  }

  return (
    <Wrapper className="wrap marginTop" id="order">
      <Container_Style className="wrap">
        <User_Status_Row className="borderBottom">
          <Title>나의 구매내역</Title>
        </User_Status_Row>

        {currentPosts.map((order, index) => (
          <div
            key={order.ORDER_NO}
            className="flex userOrder"
            onClick={() =>
              navigate(`/userOrder_detail/${order.ORDER_NO}`, {
                state: { orders },
              })
            }
            style={{
              border: "1px solid #ccc",
              margin: "20px",
              padding: "15px",
              cursor: "pointer",
            }}
          >
            <ul>
              {order.ITEMS.slice(0, 1).map((item) => (
                <li
                  key={item.product_no}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={`${imgPath}/${productImgs[indexOfFirstPost + index]}`}
                    alt={item.product_name}
                    width="150"
                    height="150"
                  />
                  <div style={{ marginLeft: "10px" }}>
                    {order.ITEMS.length > 1 ? (
                      <h4>
                        {item.product_name} 외 {order.ITEMS.length - 1}개
                      </h4>
                    ) : (
                      <h4>{item.product_name}</h4>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <Order_Wrapper>
              <p>
                주문일자 :{" "}
                {new Date(order.ORDER_DATE).toLocaleDateString("ko-KR")}
              </p>
              <p>
                주문상태 : {order.ORDER_STATE === 0 ? "주문취소" : "주문완료"}
              </p>
              <p>총 금액: {order.TOTAL_PRICE.toLocaleString()}원</p>
            </Order_Wrapper>
          </div>
        ))}

        {/*페이징 버튼*/}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  margin: "0 5px",
                  padding: "5px 10px",
                  backgroundColor: currentPage === i + 1 ? "black" : "white",
                  color: currentPage === i + 1 ? "white" : "black",
                  border: "1px solid black",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
        <div>
          <Button
            className={"returnToMyPage"}
            btnTxt={"마이페이지"}
            onClick={() => navigate("/mypage")}
          />
        </div>
      </Container_Style>
    </Wrapper>
  );
};

export default UserOrderList;
