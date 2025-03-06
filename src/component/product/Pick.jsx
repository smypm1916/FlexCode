import React from "react";
import styled from "styled-components";
// MD's PICK 제목
const Title = styled.h2`
  width: 100%;
  text-align: left;
  color: black;
  margin: 0;
  letter-spacing: 2px;
`;

// MD's PICK 컨테이너
const Container04 = styled.div`
  width: 100%;
  max-width: 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

// 컨테이너 안에서 MD's PICK을 감싸는 div
const Pick_Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

// MD's PICK 컨텐츠츠 박스
const Pick_Box = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: all 0.5s;
  color: black;
  &:hover {
    color: white;
    background-color: #bb9393;
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);
  }
`;
// MD's PICK 상품품 이미지
const Pick_img = styled.div`
  width: 100%;
  height: 200px;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
  }
`;
// MD's PICK 상품 설명 div
const Pick_Text = styled.div`
  di; flex;
  flex-direction: column;
  gap: 10px;
  font-size: 15pt; 
  padding: 20px;
  gap: 15px;
  
`;
// MD's PICK 상품 설명 텍스트
const Text = styled.p`
  width: fit-content;
`;

const Pick = () => {
  return (
    <Container04>
      <Title>MD'S PICK</Title>
      <Pick_Wrapper>
        <Pick_Box>
          <Pick_img>
            <img src="src\style\img\blue_hat.png" />
          </Pick_img>
          <Pick_Text>
            <Text>MD가 추천하는 핫한 액세서리</Text>
            <Text>블루 올 비니</Text>
            <Text>12,000원</Text>
          </Pick_Text>
        </Pick_Box>
        <Pick_Box>
          <Pick_img>
            <img src="src/style/img/shirts.png" />
          </Pick_img>
          <Pick_Text>
            <Text>무난한 패션의 대명사</Text>
            <Text>화이트 셔츠</Text>
            <Text>13,000원</Text>
          </Pick_Text>
        </Pick_Box>
      </Pick_Wrapper>
    </Container04>
  );
};

export default Pick;
