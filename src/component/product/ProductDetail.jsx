import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../common/Button";
import Select from "../common/Select";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 1440px;
  width: 60%;
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  gap: 80px;
`;
// 상품 정보 컨테이너
const Container01 = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

// 상품 상세 설명 이미지 컨테이너
const Container02 = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;
// 상품 상세 설명 이미지 컨테이너
const Container03 = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr;
`;

//container01 상품 설명정보 div
const Product_Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

//container01 상품 정보 이미지 div
const Image_Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
  }
`;
//container01 상품 정보 텍스트 컨테이너
const Text_wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

//container01 상품 정보 텍스트
const Text = styled.h2`
  width: fit-content;
  font-size: 15pt;
  color: black;
  font-weight: 300;
`;

//container01 상품 정보 제목
const Title = styled.h2`
  text-align: left;
  color: black;
  margin: 0;
  letter-spacing: 2px;
  font-size: 15pt;
`;

//container01 상품 정보 상품명
const Product_Title = styled.h1`
  text-align: left;
  color: black;
  margin: 0;
  letter-spacing: 2px;
  font-size: 30pt;
`;

//container01 상품 정보 텍스트 박스
const Text_box = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

//container01 상품 정보 텍스트 박스 제목
const Button_Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Divide_Box = styled.div`
  width: -webkit-fill-available;
  background-color: #bb9393;
  padding: 20px;
`;

const Info_Wrapper = styled.div`
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Info_Title = styled.div`
  padding: 10px 20px;
  width: -webkit-fill-available;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

const Info_Text = styled.div`
  padding: 10px 20px;
  width: fit-content;
  font-size: 12pt;
  color: black;
  font-weight: 300;
`;

//   width: -webkit-fill-available;
//   height: 45px;
//   font-size: 12pt;
//   padding: 10px;
//   background-color: white;
//   color: black;

//   &.optionList {
//     border-radius: 0;
//   }
// `;

// const Button = styled.button`
//   padding: 10px;
//   border: 1px solid black;
//   transition: all 0.5s;
//   color: black;
//   background-color: white;
//   text-decoration: none;
//   font-size: 12pt;
//   &:hover {
//     background-color: black;
//     color: white;
//     text-decoration: none;
//   }
// `;

const ProductDetail = () => {
  //   const { id } = useParams(); // URL에서 `id` 값을 가져옴
  //   const [product, setProduct] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     const fetchProduct = async () => {
  //       try {
  //         const response = await axios.get(`URL`);
  //         setProduct(response.data);
  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchProduct();
  //   }, [id]);

  //   if (loading) return <div>Loading...</div>;
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
              <div>{/* <Select /> */}</div>
              {/* 수량 */}
              <div>{/* <Select /> */}</div>
            </div>
          </Text_wrapper>

          {/* 선택 정보 */}
          <div>
            <div>{/* 장바구니 추가, 별도 컴포넌트 */}</div>
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
        <Title>DETAIL INFO</Title>
      </Divide_Box>
      {/* 컨테이너 3 */}
      <Container03>
        <Info_Wrapper>
          <Info_Title>
            <Title>상세 정보</Title>
          </Info_Title>
          <Info_Text>
            - RCS 인증된 재활용 아크릴 -
            <br />
            <br />이 소재는 다른 생산 과정에서 발생하는 아크릴 폐기물을
            재활용하여 생산됩니다. 폐기물을 새로운 소재로 전환하는 것은 원자재
            추출을 제한하는 데 도움이 됩니다. 재활용 콘텐츠를 검증하고
            원자재에서 최종 제품이 만들어지기까지의 절차를 모니터링하는
            RCS(Recycled Claim Standard)의 인증을 받았습니다.
          </Info_Text>
        </Info_Wrapper>
        <Info_Wrapper>
          <Info_Title>
            <Title>배송, 교환 및 반품</Title>
          </Info_Title>
          <Info_Text>
            - 배송 -
            <br />
            <br />
            매장으로 배송 - 무료
            <br />
            영업일 기준 2-3일 이내 배송.
            <br />
            이 옵션은 부피가 큰 HOME 상품이 포함된 주문에는 사용할 수 없습니다.
            <br />
            <br />
            <Text>자택 배송</Text>
            <br />
            익일 배송 - ₩ 4,000
            <br />
            영업일 기준 2-3일 이내 배송 - ₩ 3,000
            <br />
            ₩ 49,000 이상 주문 시 할인되지 않은 제품에 한해 배송비는 무료입니다.
            <br />
            주문에 부피가 큰 HOME 제품이 포함된 경우 이에 해당되는 배송비가
            청구됩니다.
            <br />
            <br />
            - 교환 및 환불 -
            <br />
            구매한 제품은 주문 출고일로부터 31일 안에 반품하실 수 있습니다.
            <br />
            <br />
            매장에서 반품 - 무료
            <br />
            <br />
            HOME 제품은 매장에서 반품하실 수 있습니다.
            <br />
            <br />
            자택 수거 서비스 - ₩ 2,900
            <br />
            <br />
            반품 비용은 반품 요청 건당 적용되며 환불 금액에서 차감됩니다.
          </Info_Text>
        </Info_Wrapper>
        <Info_Wrapper>
          <Info_Title>
            <Title>CAUTION</Title>
          </Info_Title>
          <Info_Text>
            <Text></Text>
          </Info_Text>
        </Info_Wrapper>
      </Container03>

      {/* 컨테이너 4 */}
      <div>{/* 리뷰??? */}</div>
    </Wrapper>
  );
};

export default ProductDetail;
