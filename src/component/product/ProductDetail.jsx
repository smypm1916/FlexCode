import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button_Wrapper_100,
  Container_Style,
  Wrapper,
} from "../../style/Common_Style";
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
import Button from "../common/Button";

const ProductDetail = () => {
  const { product_no } = useParams();
  console.log("====================================");
  console.log(product_no);
  console.log("====================================");
  const [product, setProduct] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const imgPath = import.meta.env.VITE_IMG_PATH;

  // 옵션 삭제
  const onRemove = (option_no) => {
    setSelectedOption((prev) => {
      prev.filter((option) => option.option_no !== option_no);
    });
  };

  // 옵션 선택 핸들러 (옵션 + 수량)
  const onChangeHandler = (e) => {
    const optionSelected = options.find((option) => option.option_no === parseInt(e.target.value));
    if (optionSelected) {
      // 중복 선택 방지
      if (!selectedOption.some((option) => option.option_no === optionSelected.option_no)) {
        setSelectedOption((prev) => [...prev, { ...optionSelected, quantity: 1 }]);
      }
    }
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
      // setLoading(true);
      const res = await axios.get(`http://localhost:8080/api/products/detail/${product_no}`, {
        headers: { Accept: "application/json" },
      });
      if (res.data && res.data.success) {
        // const newProduct = res.data.data || [];;
        // setProduct((prev) => [...prev, ...newProduct]);
        setProduct(res.data.data || []);

      }
      console.log("API 응답:", res.data);
    } catch (error) {
      console.error("detail load error", error);
    }
  };

  // 최초 상품 로드 시 같이 실행 -> 셀렉터 선택 시에 장바구니에 옵션 추가
  // 상품 옵션 취득
  const fetchOptions = async (product_no) => {
    if (!product_no || isNaN(product_no)) {
      console.error("잘못된 product_no:", product_no);
      setLoading(false);
      setError("잘못된 상품 번호입니다.");
      return;
    }
    try {
      const resOptions = await axios.get(`http://localhost:8080/api/options/detail/${product_no}`, {
        headers: { Accept: "application/json" },
      });
      console.log("OPTION API 응답:", resOptions.data);
      if (resOptions.data && resOptions.data.success) {
        // const newOptions = resOptions.data.data || [];
        // setOptions((prev) => [...prev, ...newOptions]);
        setOptions(resOptions.data.data || []);
      }
    } catch (error) {
      console.error("detail option load error", error);
      setError(error);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    if (!product_no) {
      console.error("product_no 필요");
      return;
    }
    const loadProductData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          fetchProductDetail(product_no),
          fetchOptions(product_no),
        ]);
      } catch (error) {
        console.error("데이터 로드 중 오류 발생:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadProductData();
  }, [product_no]);

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
            {/* 카테고리 */}
            <Text_wrapper>
              <Text>카 테 고 리</Text>
              <Title>상품 타입</Title>
              <Product_Title>{product.PRODUCT_NAME}</Product_Title>
              <Text_box>
                <Title>판매 가격</Title>
                <Text>{product.PRODUCT_PRICE} 원</Text>
              </Text_box>
              <Text_box>
                <Title>배송비</Title>
                <Text>배송비 원</Text>
              </Text_box>
              <Text_box>
                <Title>배송 지역</Title>
                <Text>배송지역</Text>
              </Text_box>
              <Text_box>
                <Title>배송 기간</Title>
                <Text>배송기간</Text>
              </Text_box>
              <div>
                {/* 옵션 선택*/}
                <Select
                  className={"optionName"}
                  options={[
                    { value: "", label: "---" },
                    // Array.isArray(options) ? options.map((option) => ({
                    //     value: option.option_no,
                    //     label: `${option.option_title}(+${option.option_price} 원)`,
                    //   }))
                    //   : [],
                    ...options.map((option) => ({
                      value: option.option_no,
                      label: `${option.option_title} (+${option.option_price} 원)`,
                    })),
                  ]}
                  onChange={onChangeHandler}
                />
                {/* 수량 */}
                <Select className={"optionState"} options={1} />
              </div>
            </Text_wrapper>

            {/* 선택 정보 */}
            <div>
              <div>{/* 장바구니 추가, 별도 컴포넌트 */}</div>
            </div>

            {/* 상품 선택 정보 */}
            <div>
              <CheckedProduct product={product} options={selectedOption} setSelectedOption={setSelectedOption} onRemove={onRemove} />
            </div>

            {/* 버튼 */}
            <Button_Wrapper_100>
              <Button btnTxt="바로구매" />
              <Button btnTxt="장바구니" onClick />
            </Button_Wrapper_100>
          </Product_Wrapper>
        </Container01>
        <Divide_Box>
          <Title>PRODUCT IMAGE</Title>
        </Divide_Box>
        {/* 컨테이너 2 */}
        <Container02>
          <Image_Wrapper>
            {/* 상품 이미지 컴포넌트, 스크롤 이벤트 */}
            <img src="src\style\img\shirts.png" alt="" />
            <img src="src\style\img\shirts.png" alt="" />
            <img src="src\style\img\shirts.png" alt="" />
          </Image_Wrapper>
        </Container02>
        <Divide_Box>
          <p>DETAIL INFO</p>
        </Divide_Box>
        {/* 컨테이너 3 */}
        <Container03>
          <Info_Wrapper>
            <Info_Title>
              <p>상세 정보</p>
            </Info_Title>
            <Info_Text>
              <Info_Text_Box>
                <p>
                  RCS 인증된
                  <br />
                  재활용 폴리에스터
                </p>
                <Info_Wrapper>
                  <p>
                    오늘날 재활용 폴리에스터는 주로 폐기된 PET 플라스틱에서
                    얻습니다. 플라스틱 병과 같은 다양한 제품에 널리 사용되는
                    플라스틱 유형입니다. 재활용 소재의 사용은 폴리에스터 원자재
                    섬유 생산을 제한하는 데 도움이 됩니다. 재활용 콘텐츠를
                    검증하고 원자재에서 최종 제품이 만들어지기까지의 절차를
                    모니터링하는 RCS(Recycled Claim Standard)에 따라
                    인증되었습니다.
                  </p>
                </Info_Wrapper>
              </Info_Text_Box>
            </Info_Text>
          </Info_Wrapper>
          <Info_Wrapper>
            {/* ------ */}
            <Info_Title>
              <p>배송, 교환 및 반품</p>
            </Info_Title>
            {/* ------- */}
            <Info_Text>
              {/* ------- */}
              <Info_Text_Box>
                <p>배송</p>
                <Info_Wrapper>
                  <p>매장으로 배송 - 무료 영업일 기준 2-3일 이내 배송.</p>
                  <p>
                    이 옵션은 부피가 큰 HOME 상품이 포함된 주문에는 사용할 수
                    없습니다.
                  </p>
                </Info_Wrapper>
              </Info_Text_Box>
              <Info_Text_Box>
                <p>자택 배송</p>
                <Info_Wrapper>
                  <p>
                    익일 배송 - ₩ 4,000 영업일 기준 2-3일 이내 배송 - ₩ 3,000
                  </p>
                  <p>
                    ₩ 49,000 이상 주문 시 할인되지 않은 제품에 한해 배송비는
                    무료입니다.
                  </p>
                  <p>
                    주문에 부피가 큰 HOME 제품이 포함된 경우 이에 해당되는
                    배송비가 청구됩니다.
                  </p>
                </Info_Wrapper>
              </Info_Text_Box>
              <Info_Text_Box>
                <p>교환 및 환불</p>
                <Info_Wrapper>
                  <p>
                    구매한 제품은 주문 출고일로부터 31일 안에 반품하실 수
                    있습니다.
                  </p>
                  <p>
                    매장에서 반품 - 무료 HOME 제품은 매장에서 반품하실 수
                    있습니다.
                  </p>
                  <p>
                    자택 수거 서비스 - ₩ 2,900 반품 비용은 반품 요청 건당
                    적용되며 환불 금액에서 차감됩니다.
                  </p>
                </Info_Wrapper>
              </Info_Text_Box>
            </Info_Text>
          </Info_Wrapper>
          <Info_Wrapper>
            {/* ------ */}
            <Info_Title>
              <p>세탁방법</p>
            </Info_Title>
            {/* ------- */}
            <Info_Text>
              {/* ------- */}

              <Info_Text_Box>
                <p>물세탁 금지</p>
                <Info_Wrapper></Info_Wrapper>
              </Info_Text_Box>
              <Info_Text_Box>
                <p>표백제 사용 금지</p>
                <Info_Wrapper></Info_Wrapper>
              </Info_Text_Box>
              <Info_Text_Box>
                <p>
                  최고 110도 <br />
                  다림질 가능{" "}
                </p>
                <Info_Wrapper></Info_Wrapper>
              </Info_Text_Box>
              <Info_Text_Box>
                <p>테트라클로로에틸렌 드라이클리닝</p>
                <Info_Wrapper></Info_Wrapper>
              </Info_Text_Box>
              <Info_Text_Box>
                <p>건조기 사용 금지</p>
                <Info_Wrapper></Info_Wrapper>
              </Info_Text_Box>
            </Info_Text>
          </Info_Wrapper>
        </Container03>
        {/* 컨테이너 4 */}
        <div>{/* 리뷰??? */}</div>
      </Container_Style>
    </Wrapper>
  );
};

export default ProductDetail;
