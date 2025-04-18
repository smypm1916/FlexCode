import axios from "axios";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Button_Wrapper_100,
  Container_Style,
  Title,
  Wrapper,
} from "../../style/Common_Style";
import { Order_Wrapper } from "../../style/Mypage_Style";
import { System_message } from "../../style/ProductLists_Style";
import { Text } from "../../style/Product_Detail_Style";
import LoginModal from "../account/LoginModal";
import Button from "../common/Button";
import CheckedProduct from "../common/CheckedProduct";
import { useCart } from "../common/useCart";
import ShippingAddress from "./ShippingAddress";
//import jwt_decode from "jwt-decode";
/*  
    1. 모든/일부 상품 선택
    2. 상품 옵션/수량 수정 ok
    3. 구매버튼 클릭 시 장바구니 정보 db로 전송 ok
*/

const Order = () => {
  const { tempOrderId } = useParams();
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const product = location.state?.product;
  const directOptions = location.state?.checkedProducts;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    base_address: "",
    detail_address: "",
    tel_first: "010",
    tel_mid: "",
    tel_last: "",
    email_id: "",
    email_domain: "naver.com",
  });
  const [receiveInfo, setReceiveInfo] = useState({ ...deliveryInfo });
  const [isSame, setIsSame] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const imgPath = import.meta.env.VITE_IMG_PATH;
  const [error, setError] = useState(null);
  const goToHome = () => navigate("/");
  const { cartItems, updateCartQuantity, loading, fetchCart, removeFromCart } =
    useCart();
  const [checkedProducts, setCheckedProducts] = useState([]);
  console.log(tempOrderId);

  // console.log(localStorage.getItem('token'))

  const API_BASE_URL = "http://localhost:8080/api";

  // 주문자 기본 정보 조회
  const getUserInfo = async (email) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/getUser`,
        { email },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const user = response.data.result.rows[0]; // 오라클은 rows 배열로 옴
        if (user) {
          // 주소는 "기본주소/상세주소"로 저장되어 있다고 가정
          const [base_address, detail_address] = user.USER_ADDR?.split("/") || [
            "",
            "",
          ];

          const [tel_first, tel_mid, tel_last] = user.USER_TEL?.split("-") || [
            "010",
            "",
            "",
          ];

          setDeliveryInfo({
            name: user.USER_NAME || "",
            base_address,
            detail_address,
            tel_first,
            tel_mid,
            tel_last,
            email_id: user.USER_EMAIL?.split("@")[0] || "",
            email_domain: user.USER_EMAIL?.split("@")[1] || "naver.com",
          });
        }
      } else {
        console.warn("회원 정보 불러오기 실패:", response.data.message);
      }
    } catch (err) {
      console.error("회원정보 조회 오류:", err);
    }
  };

  // 결제 기능
  const goToPayment = async () => {
    sessionStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      setIsLoginModalOpen(true); // 로그인 모달 열기
      return;
    }
    // if (!isLoggedIn) {
    // alert("로그인이 필요합니다!!");
    // setIsLoginModalOpen(true); // 로그인 모달 열기
    // return;
    // }

    if (!deliveryInfo.email_id || !deliveryInfo.email_domain) {
      alert("이메일 정보를 정확히 입력해주세요.");
      return;
    }

    const email = `${deliveryInfo.email_id}@${deliveryInfo.email_domain}`;

    try {
      // const response = await axios.post(`${API_BASE_URL}/order/pay/${from === 'direct' ? 'direct' : tempOrderId}`, {
      const response = await axios.post(
        `${API_BASE_URL}/order/pay/${tempOrderId}`,
        {
          tempOrderId: tempOrderId,
          from,
          checkedProducts,
          product,
          totalPrice,
          email,
          deliveryInfo,
          receiveInfo,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        const orderNo = response.data.orderNo;
        navigate(`/order-complete/${orderNo}`);
      } else {
        alert("결제 처리 실패: " + response.data.message);
      }
    } catch (error) {
      console.error("결제 오류:", error);
      alert("결제 중 오류가 발생했습니다.");
    }
  };

  // 옵션 삭제
  const onRemove = (OPTION_NO) => {
    return () => {
      setCheckedProducts((prev) =>
        prev.filter((opt) => opt.OPTION_NO !== OPTION_NO)
      );
    };
  };

  const openEditModal = (item) => {
    setSelectedProduct(item);
    setIsCartModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedProduct(null);
    setIsCartModalOpen(false);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleCheckboxChange = (e) => {
    setIsSame(e.target.checked);
    if (e.target.checked) {
      setReceiveInfo({ ...deliveryInfo });
    }
  };

  useEffect(() => {
    console.log("order");
    setToken(sessionStorage.getItem("token"));
  }, []);

  // 장바구니 비우기
  const clearCart = async () => {
    // const token = localStorage.getItem("token");
    await axios.delete(`${API_BASE_URL}/cart/clear`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchCart();
  };

  useEffect(() => {
    if (Array.isArray(directOptions)) {
      setCheckedProducts(directOptions);
      console.log("바로구매 상품:", product, directOptions);
    } else if (tempOrderId) {
      fetchCart(tempOrderId);
    } else {
      ``
      setError("주문 정보가 올바르지 않습니다.");
    }
  }, [from, directOptions, tempOrderId]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);

    if (token) {
      const email = JSON.parse(atob(token.split(".")[1]))?.email; // JWT 디코딩 (email 추출)
      //const decoded = jwt_decode(token);
      //const email = decoded?.email;
      if (email) getUserInfo(email);
    }
    // if (token) {
    //   const decoded = jwt_decode(token);
    //   const email = decoded?.email;
    //   if (email) getUserInfo(email);
    // }
  }, []);


  useEffect(() => {
    console.log("cartItems changed", cartItems);
  }, [cartItems]);

  // 로그인 상태 체크
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const totalPrice =
    checkedProducts?.reduce((sum, item) => {
      const productPrice = product?.PRODUCT_PRICE || 0;
      const optionPrice = item?.OPTION_PRICE || 0;
      return sum + (productPrice + optionPrice) * item.quantity;
    }, 0)

  // const totalPrice =
  //   from === "direct"
  //     ? checkedProducts?.reduce((sum, item) => {
  //       const productPrice = product?.PRODUCT_PRICE || 0;
  //       const optionPrice = item?.OPTION_PRICE || 0;
  //       return sum + (productPrice + optionPrice) * item.quantity;
  //     }, 0)
  //     : cartItems.reduce((sum, item) => {
  //       const productPrice = item.product_price || 0;
  //       const optionPrice = item.option_price || 0;
  //       return sum + (productPrice + optionPrice) * item.quantity;
  //     }, 0);

  return (
    <Wrapper className="marginTop wrap" id="shipping">
      <Container_Style>
        {/* <h1>주문 번호 : {tempOrderId}</h1> */}
        {loading && <System_message>...LOADING...</System_message>}
        {error && <System_message>{error}</System_message>}

        {/* 장바구니 리스트 */}
        {!loading &&
          // from === "direct" &&
          Array.isArray(checkedProducts) &&
          checkedProducts.length > 0
          ? checkedProducts.map((item) => {
            console.log("checkedProducts :", item);
            const productKey = `product:${product.PRODUCT_NO}:option:${item.OPTION_NO}`;
            return (
              <Order_Wrapper key={`${item.OPTION_NO}`}>
                <Title>{product.PRODUCT_NAME}</Title>
                <Text>옵션명: {item.OPTION_TITLE}</Text>
                <Text>수량: {item.quantity}</Text>
                <hr />
                <Title>
                  {/* 금액:{" "} */}
                  {(product.PRODUCT_PRICE + item.OPTION_PRICE) *
                    item.quantity}
                  원
                </Title>
                <Button_Wrapper_100 className="grid2">
                  <Button
                    btnTxt="옵션/수량 수정"
                    onClick={() =>
                      openEditModal({
                        ...item,
                        product_name: product.product_name,
                        product_price: product.product_price,
                        product_no: product.product_no,
                        option_title: item.option_title,
                        option_price: item.option_price,
                        option_no: item.option_no,
                        // product_name: product.PRODUCT_NAME,
                        // product_price: product.PRODUCT_PRICE,
                        // product_no: product.PRODUCT_NO,
                        // option_title: item.OPTION_TITLE,
                        // option_price: item.OPTION_PRICE,
                        // option_no: item.OPTION_NO,
                      })
                    }
                  />
                  <Button
                    btnTxt="옵션 삭제"
                    onClick={onRemove(item.OPTION_NO)}
                  />
                </Button_Wrapper_100>
              </Order_Wrapper>
            );
          })
          : !loading && cartItems.length > 0
            ? cartItems.map((item) => {
              console.log("cartItems :", item);
              const productKey = `product:${item.product_no}:option:${item.option_no}`;
              return (
                <Order_Wrapper key={productKey}>
                  <Title>상품명: {item.product_name}</Title>
                  <Text>옵션명: {item.option_title}</Text>
                  <Text>수량: {item.quantity}</Text>
                  <Text>
                    금액:{" "}
                    {(item.product_price + item.option_price) * item.quantity}원
                  </Text>
                  <Button_Wrapper_100>
                    <Button
                      btnTxt="옵션 수정"
                      onClick={() => openEditModal(item)}
                    />
                    <Button
                      btnTxt="옵션 삭제"
                      onClick={() => removeFromCart(productKey)}
                    />
                  </Button_Wrapper_100>
                </Order_Wrapper>
              );
            })
            : !loading && <h2>장바구니가 비어있습니다.</h2>}

        {/* 합계 금액 */}
        <Text>합계 금액 : {totalPrice.toLocaleString()} 원</Text>

        {/* 옵션 변경 모달 */}
        <ReactModal
          isOpen={isCartModalOpen}
          onRequestClose={closeEditModal}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경색
              zIndex: 300,
            },
            content: {
              width: "40%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              position: "static", // static으로 변경
              background: "white",
              padding: "20px",
              borderRadius: "0",
              border: "none",
              padding: "50px",
            },
          }}
        >
          {selectedProduct && (
            <CheckedProduct
              style={{ flexDirection: "row-reverse" }}
              mode="order"
              cartItems={[selectedProduct]}
              // !!수량변경 및 옵션 삭제 작동안함!!!
              updateCartQuantity={(product_no, quantity) => {
                if (from === "direct") {
                  setCheckedProducts((prev) =>
                    prev.map((opt) =>
                      // opt.OPTION_NO === selectedProduct.option_no
                      opt.OPTION_NO === option_no ? { ...opt, quantity } : opt
                    )
                  );
                } else {
                  // updateCartQuantity(product_no, quantity);
                  updateCartQuantity(PRODUCT_NO, OPTION_NO, quantity);
                }
              }}
              removeFromCart={(productKey) => {
                if (from === "direct") {
                  setCheckedProducts((prev) =>
                    prev.filter(
                      (opt) =>
                        `product:${product.PRODUCT_NO}:option:${opt.OPTION_NO}` !==
                        productKey
                    )
                  );
                  setIsCartModalOpen(false);
                } else {
                  removeFromCart(productKey);
                }
              }}
            />
          )}
        </ReactModal>

        {/* 배송&수령 정보 */}
        <ShippingAddress
          title="주문자 정보"
          data={deliveryInfo}
          setData={setDeliveryInfo}
        />
        <label>
          <input
            type="checkbox"
            checked={isSame}
            onChange={handleCheckboxChange}
          />{" "}
          주문자 정보와 동일
        </label>
        <ShippingAddress
          title="받는 사람"
          data={receiveInfo}
          setData={setReceiveInfo}
          isReadOnly={isSame}
        />

        {/* 결제/취소 */}
        <Button_Wrapper_100 className="grid2">
          <Button btnTxt="결제하기" onClick={goToPayment} />
          <Button btnTxt="돌아가기" onClick={goToHome} />
        </Button_Wrapper_100>
        <ReactModal
          isOpen={isLoginModalOpen}
          onRequestClose={closeLoginModal}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <LoginModal onClose={closeLoginModal} />
        </ReactModal>
      </Container_Style>
    </Wrapper>
  );
};

export default Order;
