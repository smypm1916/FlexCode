import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button_Wrapper_100,
  Container_Style,
  Wrapper,
} from "../../style/Common_Style";
import Button from "../common/Button";
import CartModal from "../common/CartModal";
import CheckedProduct from "../common/CheckedProduct";
import Select from "../common/Select";
import { useCart } from "../common/useCart";

import {
  Container01,
  Container02,
  Container03,
  Divide_Box,
  Image_Wrapper,
  Info_Text,
  Info_Text_Box,
  Info_Title,
  Info_Wrapper,
  Product_Wrapper,
  Text,
  Text_box,
  Text_wrapper,
  Title,
} from "../../style/Product_Detail_Style";
import { System_message } from "../../style/ProductLists_Style";

const ProductInfo = () => {
  const { product_no } = useParams();
  const [productImages, setProductImages] = useState([]);
  const [product, setProduct] = useState({});
  const [options, setOptions] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState([]); // 최종 선택된 옵션들
  const [currentOption, setCurrentOption] = useState(null); // 현재 선택된 옵션
  const [currentQuantity, setCurrentQuantity] = useState(1); // 현재 선택된 수량
  const [localTempOrderId, setLocalTempOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const openModal = () => setIsCartModalOpen(true);
  const closeModal = () => setIsCartModalOpen(false);
  const navigate = useNavigate();
  const imgPath = import.meta.env.VITE_IMG_PATH;
  const {
    addToCart,
    fetchCart,
    cartItems,
    loading: cartLoading,
    tempOrderId,
  } = useCart();

  const API_BASE_URL = "http://localhost:8080/api";

  // 옵션 삭제
  const onRemove = (OPTION_NO) => {
    return () => {
      setCheckedProducts((prev) =>
        prev.filter((opt) => opt.OPTION_NO !== OPTION_NO)
      );
    };
  };

  const addToCartHandler = async () => {
    if (checkedProducts.length === 0) {
      alert("옵션을 선택하세요.");
      return;
    }

    const newTempOrderId = await addToCart(
      product_no,
      product.PRODUCT_NAME,
      product.PRODUCT_PRICE,
      checkedProducts
    );
    if (newTempOrderId) {
      setLocalTempOrderId(newTempOrderId);
    }
    await fetchCart();
    setIsCartModalOpen(true);
    // setCheckedProducts([]);
  };

  // 옵션 선택 핸들러
  const optionHandler = (e) => {
    // 선택된 값이 없으면 리턴
    const OPTION_NO = parseInt(e.target.value);
    if (!OPTION_NO) {
      setCurrentOption(null);
      setCurrentQuantity(1);
      return;
    }

    const selected = options.find((opt) => opt.OPTION_NO === OPTION_NO);

    if (!selected || selected.OPTION_STATE <= 0) {
      alert("Currently run out of stock!");
      setCurrentOption(null);
      setCurrentQuantity(1);
      return;
    }

    // 이미 선택된 옵션인지 확인
    const exist = checkedProducts.find((opt) => opt.OPTION_NO === OPTION_NO);
    if (exist) {
      // 이미 선택된 옵션이면 현재 선택 초기화
      setCurrentOption(null);
      setCurrentQuantity(1);
      return;
    }

    // 현재 선택된 옵션 설정
    setCurrentOption(selected);
    setCurrentQuantity(1);
  };


  // 수량 변경 핸들러
  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);
    if (isNaN(quantity) || quantity < 1) return;
    setCurrentQuantity(quantity);
  };

  // 옵션 추가 핸들러
  const addOptionHandler = () => {
    if (!currentOption) return;
    setCheckedProducts((prev) => [
      ...prev,
      { ...currentOption, quantity: currentQuantity },
    ]);
    // 옵션 추가 후 현재 선택 초기화
    setCurrentOption(null);
    setCurrentQuantity(1);
  };

  // 최종 선택된 옵션 수량 변경 핸들러
  const quantityHandler = (OPTION_NO, quantity) => {
    setCheckedProducts((prev) =>
      prev.map((opt) =>
        opt.OPTION_NO === OPTION_NO ? { ...opt, quantity } : opt
      )
    );
  };

  // 상품 정보 조회
  const fetchProductDetail = async (product_no) => {
    if (!product_no || isNaN(product_no)) {
      console.error("잘못된 product_no:", product_no);
      setError("잘못된 상품 번호입니다.");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `${API_BASE_URL}/products/detail/${product_no}`,
        {
          withCredentials: true,
          headers: { Accept: "application/json; charset=utf-8" },
        }
      );
      if (res.data?.success) {
        console.log("product :", res.data.data);
        const tempDetail = res.data.data;
        if (Array.isArray(tempDetail) && tempDetail.length > 0) {
          setProduct(tempDetail[0]); // 객체 저장
          // if (tempDetail[0].PRODUCT_IMG) {
          //    const splitImages = tempDetail[0].PRODUCT_IMG
          //       .split('*')
          //       .map((img) => img.trim())
          //       .filter(Boolean); // 빈 문자열 제거
          //    setProductImages(splitImages);
          // }
          if (tempDetail[0].PRODUCT_IMG) {
            // PRODUCT_IMG에 저장된 이미지 파일명들을 '*'을 기준으로 나눔
            const imageNames = tempDetail[0].PRODUCT_IMG.split("$");
            // 이미지 파일 이름에서 불필요한 공백 제거 및 실제 파일명에 맞게 처리
            const validImageNames = imageNames.map((img) => img.trim());
            // 추출된 이미지 파일명을 화면에 출력할 수 있도록 변수 혹은 상태에 설정
            setProductImages(validImageNames);
            // const matches = tempDetail[0].PRODUCT_IMG.match(/\*[^*]+\.(png|jpg|jpeg|gif)/gi);
            // if (matches) {
            //    setProductImages(matches.map(img => img.trim()));
            // }
          }
        } else {
          setProduct({});
        }
      }
    } catch (error) {
      console.error("detail load error", error);
      setError(error.message);
    }
  };

  // 상품 옵션 취득
  const fetchOptions = async (product_no) => {
    if (!product_no || isNaN(product_no)) {
      console.error("잘못된 product_no:", product_no);
      setLoading(false);
      setError("잘못된 상품 번호입니다.");
      return;
    }
    try {
      const resOptions = await axios.get(
        `${API_BASE_URL}/options/detail/${product_no}`,
        {
          withCredentials: true,
          headers: { Accept: "application/json; charset=utf-8" },
        }
      );
      if (resOptions.data?.success) {
        setOptions(resOptions.data.data || []);
      }
    } catch (error) {
      console.error("detail option load error", error);
      setError(error.message);
    }
  };

  // 장바구니 모달 닫기
  const closeCartModal = () => {
    Products([]);
    setIsCartModalOpen(false);
  };

  const goToOrder = () => {
    const currentOrderId = localTempOrderId || tempOrderId;
    if (!currentOrderId) {
      alert("Cart is empty or Order information isn't ready");
      return;
    }
    navigate(`/order/${tempOrderId}`, {
      state: {
        // from: "direct",
        product,
        checkedProducts,
      },
    });
  };

  // product_no 변경 시 상품 정보 로드
  useEffect(() => {
    if (!product_no) {
      console.error("product_no 필요");
      return;
    }
    const loadProductData = async () => {
      console.log("제품 코드:", product_no);
      setLoading(true);
      await Promise.all([
        fetchProductDetail(product_no),
        fetchOptions(product_no),
      ]);
      setLoading(false);
    };
    loadProductData();
  }, [product_no]);

  if (loading)
    return <System_message className="Inner_con">Loading...</System_message>;
  if (error)
    return <System_message className="Inner_con">Error...</System_message>;

  return (
    <Wrapper>
      <Container_Style>
        <Container01>
          {/* 이미지 */}
          {/* <Image_Wrapper>
                  <img
                     src={`${imgPath}/${product?.PRODUCT_IMG}`}
                     alt={product?.PRODUCT_NAME}
                  />
               </Image_Wrapper> */}
          <Image_Wrapper>
            {productImages.length > 0 ? (
              <img
                src={`${imgPath}/${productImages[0]}`}
                alt={product?.PRODUCT_NAME}
              />
            ) : (
              <img
                src={`${imgPath}/${product?.PRODUCT_IMG}`}
                alt={product?.PRODUCT_NAME}
              />
            )}
          </Image_Wrapper>

          {/* 상품정보 */}
          <Product_Wrapper>
            <Text_wrapper>
              <Text_box className="column">
                <Text>{product.PRODUCT_TYPE}</Text>
                <h1>{product.PRODUCT_NAME}</h1>
              </Text_box>
              <Text_box>
                <Title>Price</Title>
                <Text>{product.PRODUCT_PRICE} ¥</Text>
              </Text_box>

              {/* 옵션 선택 */}
              <Select
                className={"optionName"}
                options={[
                  { value: "", label: "Choose Options" },
                  ...options.map((opt) => ({
                    value: opt.OPTION_NO,
                    label: `${opt.OPTION_TITLE} (+${opt.OPTION_PRICE} ¥) ${opt.OPTION_STATE <= 0 ? "(Out of stock)" : ""
                      }`,
                    disabled: opt.OPTION_STATE <= 0,
                  })),
                ]}
                onChange={optionHandler}
                defaultValue=""
              />

              {/* 수량 선택 (옵션 선택 시에만 표시) */}
              {currentOption && (
                <div style={{ marginTop: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <Title>{currentOption.OPTION_TITLE}</Title>
                      <Text>+{currentOption.OPTION_PRICE} ¥</Text>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Select
                        // options={Array.from({ length: 10 }, (_, i) => ({
                        //    value: i + 1,
                        //    label: `${i + 1}개`,
                        // }))}
                        options={Array.from(
                          { length: currentOption.OPTION_STATE },
                          (_, i) => ({
                            value: i + 1,
                            label: `${i + 1}pcs`,
                          })
                        )}
                        onChange={handleQuantityChange}
                        defaultValue={1}
                      />
                      <Button btnTxt="ADD" onClick={addOptionHandler} />
                    </div>
                  </div>
                </div>
              )}

              {/* 선택된 옵션 표시 */}
              {checkedProducts.length > 0 && (
                <CheckedProduct
                  mode="detail"
                  product={product}
                  options={checkedProducts}
                  quantityHandler={quantityHandler}
                  onRemove={onRemove}
                />
              )}
            </Text_wrapper>

            {/* 버튼 */}
            <Button_Wrapper_100 className="grid2">
              <Button onClick={goToOrder} btnTxt="Buy Now" />
              <Button
                onClick={addToCartHandler}
                disabled={cartLoading || checkedProducts.length === 0}
                btnTxt="Cart"
              />
              {/* 장바구니 모달 출현 */}
            </Button_Wrapper_100>
          </Product_Wrapper>
        </Container01>

        <Divide_Box>
          <Title>PRODUCT IMAGE</Title>
        </Divide_Box>

        {/* 컨테이너 2 */}
        <Container02>
          {/* <Image_Wrapper>
                  <img src="src/style/img/shirts.png" alt="" />
                  <img src="src/style/img/shirts.png" alt="" />
                  <img src="src/style/img/shirts.png" alt="" />
               </Image_Wrapper> */}
          {productImages.length > 0 ? (
            productImages.map((img, idx) => (
              <Image_Wrapper className="detailimg">
                <img
                  key={idx + 1}
                  src={`${imgPath}` + `${img}`}
                  // alt={`상품 이미지 ${idx + 1}`}
                  style={{ width: "100%", marginBottom: "20px" }}
                />
              </Image_Wrapper>
            ))
          ) : (
            <Image_Wrapper className="detailimg">
              <img src="src/style/img/shirts.png" alt="" />
              <img src="src/style/img/shirts.png" alt="" />
              <img src="src/style/img/shirts.png" alt="" />
            </Image_Wrapper>
          )}
        </Container02>
        <Divide_Box>
          <p>DETAIL INFO</p>
          {true ? <></> : <></>}
        </Divide_Box>

        {/* 컨테이너 3 - 상세 정보 */}
        <Container03>
          <Info_Wrapper>
            <Info_Title>
              <p>Detailed Informations</p>
            </Info_Title>
            <Info_Text>
              <Info_Text_Box>
                {/* <p>RCS 인증된 재활용 폴리에스터</p> */}
                <Info_Wrapper>
                  {/* <p>RCS(Recycled Claim Standard) 인증 설명</p> */}
                </Info_Wrapper>
              </Info_Text_Box>
            </Info_Text>
          </Info_Wrapper>
        </Container03>
      </Container_Style>

      {/* 장바구니 추가 모달 */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={closeModal}
        goToOrder={goToOrder}
      />
    </Wrapper>
  );
};
export default ProductInfo;
