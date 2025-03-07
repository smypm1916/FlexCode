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
  gap: 10px;
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
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px;
  width: fit-content;
  font-size: 12pt;
  color: black;
  font-weight: 300;
  width: -webkit-fill-available;
`;
const Info_Text_Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding: 10px 0;
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
//
// `;

const ProductDetail = () => {
  const { id } = useParams(); // URL에서 `id` 값을 가져옴
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`URL`);
        setProduct(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
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
