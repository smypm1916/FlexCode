import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
   Button_Wrapper_100,
   Container_Style,
   Wrapper,
} from "../../style/Common_Style";
import Button from "../common/Button";
import CheckedProduct from "../common/CheckedProduct";
import Select from "../common/Select";

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
   Product_Title,
   Product_Wrapper,
   Text,
   Text_box,
   Text_wrapper,
   Title,
} from "../../style/Product_detail_style";

const ProductInfo = () => {
   const { product_no } = useParams();
   const [product, setProduct] = useState({});
   const [options, setOptions] = useState([]);
   const [checkedProducts, setCheckedProducts] = useState([]); // 최종 선택된 옵션들
   const [currentOption, setCurrentOption] = useState(null); // 현재 선택된 옵션
   const [currentQuantity, setCurrentQuantity] = useState(1); // 현재 선택된 수량
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const navigate = useNavigate();
   const imgPath = import.meta.env.VITE_IMG_PATH;

   const API_BASE_URL = "http://localhost:8080/api";

   // 옵션 삭제
   const onRemove = (OPTION_NO) => {
      return () => {
         setCheckedProducts((prev) =>
            prev.filter((opt) => opt.OPTION_NO !== OPTION_NO)
         );
      };
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

      if (!selected) return;

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
         { ...currentOption, quantity: currentQuantity }
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
            { headers: { Accept: "application/json" } }
         );
         if (res.data?.success) {
            setProduct(res.data.data || {});
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
            { headers: { Accept: "application/json" } }
         );
         if (resOptions.data?.success) {
            setOptions(resOptions.data.data || []);
         }
      } catch (error) {
         console.error("detail option load error", error);
         setError(error.message);
      }
   };

   // 장바구니 조회
   const fetchCart = async () => {
      try {
         setCartLoading(true);
         const res = await axios.get(`${API_BASE_URL}/cart`, {
            withCredentials: true, // for cookie
         });
         if (res.data?.success) {
            setCarItems(res.data.data.items || []);
         }
         setCartLoading(false);
      } catch (error) {
         console.error('cart load error', error);
         setError(error);
         setCartLoading(false);
      }
   };

   //장바구니 상품 추가
   const addCart = async () => {
      if (checkedProducts.length === 0) {
         alert('상품을 선택해주세요.');
         return;
      }
      try {
         setCartLoading(true);
         const cartRes = await axios.post(`${API_BASE_URL}/cart/add`, {
            product_no: product_no,
            option_no: currentOption.OPTION_NO,
            option_price: currentOption.OPTION_PRICE,
            product_quantity: currentQuantity
         }, {
            withCredentials: true
         });
         if (res.data?.success) {
            // 장바구니 모달 열기
            setCartItems(res.data.data.items || []);
            setIsCartModalOpen(true);
            // 선택된 옵션 초기화
            setCheckedProducts([]);
         } else {
            alert("장바구니 추가에 실패했습니다.");
         }
         setCartLoading(false);
      } catch (error) {
         console.error('cart add error', error);
         setError(error);
         setCartLoading(false);
      }
   };

   // 장바구니 모달 닫기
   const closeCartModal = () => {
      setIsCartModalOpen(false);
   };

   // 주문 페이지로 이동
   const goToOrder = () => {
      navigate("/order");
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
         await Promise.all([fetchProductDetail(product_no), fetchOptions(product_no)]);
         setLoading(false);
      };
      loadProductData();
   }, [product_no]);

   useEffect(() => {
      fetchCart();
   }, []);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error...</p>;

   return (
      <Wrapper>
         <Container_Style>
            {/* 컨테이너 1 */}
            <Container01>
               {/* 이미지 */}
               <Image_Wrapper>
                  <img src={`${imgPath}/${product?.PRODUCT_IMG}`} alt={product?.PRODUCT_NAME} />
               </Image_Wrapper>

               {/* 상품정보 */}
               <Product_Wrapper>
                  <Text_wrapper>
                     <Text>카 테 고 리</Text>
                     <Title>상품 타입</Title>
                     <Product_Title>{product.PRODUCT_NAME}</Product_Title>
                     <Text_box>
                        <Title>판매 가격</Title>
                        <Text>{product.PRODUCT_PRICE} 원</Text>
                     </Text_box>

                     {/* 옵션 선택 */}
                     <Select
                        className={"optionName"}
                        options={[
                           { value: "", label: "옵션 선택" },
                           ...options.map((opt) => ({
                              value: opt.OPTION_NO,
                              label: `${opt.OPTION_TITLE} (+${opt.OPTION_PRICE} 원)`,
                           }))
                        ]}
                        onChange={optionHandler}
                        defaultValue=""
                     />

                     {/* 수량 선택 (옵션 선택 시에만 표시) */}
                     {currentOption && (
                        <div style={{ marginTop: '10px' }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                 <Title>{currentOption.OPTION_TITLE}</Title>
                                 <Text>+{currentOption.OPTION_PRICE} 원</Text>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                 <Select
                                    options={Array.from({ length: 10 }, (_, i) => ({
                                       value: i + 1,
                                       label: `${i + 1}개`
                                    }))}
                                    onChange={handleQuantityChange}
                                    defaultValue={1}
                                 />
                                 <Button
                                    btnTxt="추가"
                                    onClick={addOptionHandler}
                                 />
                              </div>
                           </div>
                        </div>
                     )}

                     {/* 선택된 옵션 표시 */}
                     {checkedProducts.length > 0 && (
                        <CheckedProduct
                           product={product}
                           options={checkedProducts}
                           quantityHandler={quantityHandler}
                           onRemove={onRemove}
                        />
                     )}
                  </Text_wrapper>

                  {/* 버튼 */}
                  <Button_Wrapper_100>
                     <Button onClick={goToOrder} btnTxt="바로구매" />
                     <Button onClick={addCart} disabled={cartLoading || checkedProducts.length === 0}
                        btnTxt="장바구니" />
                     {/* 장바구니 모달 출현 */}
                  </Button_Wrapper_100>
               </Product_Wrapper>
            </Container01>

            <Divide_Box>
               <Title>PRODUCT IMAGE</Title>
            </Divide_Box>

            {/* 컨테이너 2 */}
            <Container02>
               <Image_Wrapper>
                  <img src="src/style/img/shirts.png" alt="" />
                  <img src="src/style/img/shirts.png" alt="" />
                  <img src="src/style/img/shirts.png" alt="" />
               </Image_Wrapper>
            </Container02>

            <Divide_Box>
               <p>DETAIL INFO</p>
            </Divide_Box>

            {/* 컨테이너 3 - 상세 정보 */}
            <Container03>
               <Info_Wrapper>
                  <Info_Title>
                     <p>상세 정보</p>
                  </Info_Title>
                  <Info_Text>
                     <Info_Text_Box>
                        <p>RCS 인증된 재활용 폴리에스터</p>
                        <Info_Wrapper>
                           <p>RCS(Recycled Claim Standard) 인증 설명</p>
                        </Info_Wrapper>
                     </Info_Text_Box>
                  </Info_Text>
               </Info_Wrapper>
            </Container03>
         </Container_Style>

         {/* 장바구니 모달 */}
         <CartModal
            isOpen={isCartModalOpen}
            onClose={closeCartModal}
            cartItems={cartItems}
            onConfirm={goToCheckout}
         />
      </Wrapper>
   );
};
export default ProductInfo;