import React from "react";
import styled from "styled-components";

// 이벤트 배너 컨테이너너
const Container01 = styled.div`
  background: #bb9393;
  width: 100%;
  background: ;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 400px;
  display: flex;

  &::after {
    filter: blur(10px);
  }
`;

const Event_Wrapper = styled.div`
  background: url("src/style/img/Launching_banner.png") no-repeat right;
  background-size: contain;
  width: 60%;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Event 설명 텍스트
const Text = styled.p`
  width: fit-content;
  font-size: 15pt;
  color: black;
`;

// Event 배너 제목
const Title = styled.h2`
  width: 100%;
  text-align: left;
  color: white;
  margin: 0;
  letter-spacing: 2px;
  font-size: 40pt;
`;

const Logo = styled.div`
  width: 53.4%;
  background: white;
  img {
    padding: 10px;
    margin: 0;
    font-size: 20px;
    width: 300px;
  }
`;

const EventBanner = () => {
  return (
    <Container01>
      <Event_Wrapper>
        <Logo>
          <img src="src\style\img\logo.png"></img>
        </Logo>
        <Title>Brand New Launch</Title>
        <Text>We wish GENDERLESS</Text>
      </Event_Wrapper>
    </Container01>
  );
};

export default EventBanner;
