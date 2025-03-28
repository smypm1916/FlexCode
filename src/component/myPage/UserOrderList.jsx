import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../common/Button";
import { fetchGetOrder } from "./MyPageAPI";
import {
  Button_Wrapper_100,
  Container_Style,
  Wrapper,
} from "../../style/Common_Style";
import { Button_Pagination } from "../../style/Community_Style";

const UserOrderList = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지당 5개씩 표시
  const imgPath = import.meta.env.VITE_IMG_PATH;

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
    <Wrapper className="wrap" id="order">
      <Container_Style>
        {orders.length > 0 ? (
          <div>
            <h2>나의 구매내역</h2>
            {currentPosts.length > 0}
            <ul>
              {currentPosts.map((order) => {
                return (
                  <div
                    key={order.ORDER_NO}
                    onClick={() =>
                      navigate(`/userOrder_detail/${order.ORDER_NO}`, {
                        state: { orders },
                      })
                    }
                    style={{
                      border: "1px solid #ccc",
                      margin: "20px",
                      padding: "15px",
                    }}
                  >
                    <p>
                      주문일자 :{" "}
                      {new Date(order.ORDER_DATE).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </p>
                    <p>
                      주문상태 :{" "}
                      {order.ORDER_STATE === 0 ? "주문취소" : "주문완료"}
                    </p>
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
                            src={`${imgPath}/${item.product_img}`}
                            alt={item.product_name}
                            width="150"
                            height="150"
                          />
                          <div style={{ marginLeft: "10px" }}>
                            {order.ITEMS.length > 1 ? (
                              <p>
                                {order.ITEMS[0].product_name} 외{" "}
                                {order.ITEMS.length - 1}개
                              </p>
                            ) : (
                              <p>{order.ITEMS[0].product_name}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </ul>
          </div>
        ) : (
          <div>
            <h2>작성한 커뮤니티 글이 없습니다.</h2>
          </div>
        )}
        {/* 페이지네이션 버튼 */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <Button_Pagination
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  margin: "0 5px",
                  padding: "5px 10px",
                  backgroundColor: currentPage === i + 1 ? "none" : "none",
                  color: currentPage === i + 1 ? "#bb9393" : "black",
                  cursor: "pointer",
                  transition: "all 0.5s",
                }}
              >
                {i + 1}
              </Button_Pagination>
            ))}
          </div>
        )}
        <Button_Wrapper_100 className="grid1">
          <Button
            className={"returnToMyPage"}
            btnTxt={"마이페이지"}
            onClick={() => navigate("/mypage")}
          />
        </Button_Wrapper_100>
      </Container_Style>
    </Wrapper>
  );
};

export default UserOrderList;
