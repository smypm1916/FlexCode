import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button_Wrapper,
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
  Wrapper,
} from "../../style/Product_detail_style";
import Button from "../common/Button";
import Select from "../common/Select";



const ProductDetail = () => {
  const { product_no } = useParams(); // URL에서 `id` 값을 가져옴
  const [product, setProduct] = useState(null);
  const { selectedOption, setSelectedOption } = useState(null);
  const { options, setOptions } = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const imgPath = import.meta.env.VITE_IMG_PATH;

  const onChangeHandler = (e) => {
    const optionSelected = options.find(option => option.option_no === parseInt(e.target.value));
    setSelectedOption(selected);
  };

  // 상품 정보 조회
  const fetchProductDetail = async () => {
    try {
      const res = await axios.get(`/api/products/${product_no}`, { headers: { Accept: "application/json" } });
      setProduct(res.data.data);
      console.log("API 응답:", res.data);
    } catch (error) {
      console.error('detail load error', error);
    }
  };

  // 최초 상품 로드 시 같이 실행 -> 셀렉터 선택 시에 장바구니에 옵션 추가
  // 상품 옵션 취득
  const fetchOptions = async () => {
    try {
      const resOptions = await axios.get(`/api/options/${product_no}`, { headers: { Accept: "application/json" } });
      setOptions(resOptions.data.data);
      console.log("OPTION API 응답:", resOptions.data);
    } catch (error) {
      console.error('detail option load error', error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchProductDetail();
    fetchOptions();
  }, [product_no]);



  return (
    <Wrapper>
      {/* 컨테이너 1 */}
      <Container01>
        {/* 이미지 */}
        <Image_Wrapper>
          {/* <img src="REACT_APP_IMAGE_PATH/{path}" alt="" /> */}
          <img src="src\style\img\shirts.png" alt="" />
        </Image_Wrapper>

        {/* 상품정보 */}
        <Product_Wrapper>
          {/* 카테고리 */}
          {/* <h3>{상품타입}</h3> */}
          <Text_wrapper>
            <Text>카테고리</Text>
            <Title>상품타입</Title>
            {/* <h2>{상품명}</h2> */}
            <Product_Title>상품명</Product_Title>
            {/* <div>판매가 {판매가} 원</div>
            <div>배송비 {배송비} 원</div>
            <div>배송 지역 {배송지역}</div>
            <div>배송 기간 {배송기간}</div> */}
            <Text_box>
              <Title>판매가</Title>
              <Text>판매가 원</Text>
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
              {/* 옵션 */}
              <Select className={"optionName"} options={
                [{ value: "", label: "---" },
                options.map((option) => ({
                  value: option.option_no,
                  label: `${option.option_title}(+${option.option_price} 원)`,
                })),
                ]} onChange={onChangeHandler} />
              {/* 수량 */}
              <Select className={"optionState"} options={1} />
            </div>
          </Text_wrapper>

          {/* 상품 선택 정보 */}
          <div>
            {/* <CheckedProduct /> */}
          </div>

          {/* 버튼 */}
          <Button_Wrapper>
            <Button btnTxt="바로구매" />
            <Button btnTxt="장바구니" />
          </Button_Wrapper>
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
              <p>상품명</p>
              <Info_Wrapper>
                <p>상품명 </p>
              </Info_Wrapper>
            </Info_Text_Box>
            <Info_Text_Box>
              <p>소재</p>
              <Info_Wrapper>
                <p>86% 면</p>
                <p>13% 폴리에스터</p>
                <p>1% 기타섬유</p>
              </Info_Wrapper>
            </Info_Text_Box>
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
                <p>익일 배송 - ₩ 4,000 영업일 기준 2-3일 이내 배송 - ₩ 3,000</p>
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
                  자택 수거 서비스 - ₩ 2,900 반품 비용은 반품 요청 건당 적용되며
                  환불 금액에서 차감됩니다.
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
    </Wrapper>
  );
};

export default ProductDetail;
