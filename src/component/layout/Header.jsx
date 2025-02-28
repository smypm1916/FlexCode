import React, { useState } from "react";
import styled from "styled-components";
import LoginModal from "../account/LoginModal";

//상단의 header 전체를 묶는 div
const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 1px solid black;
  transition: all 0.5s;

  &:hover {
    background: white;
  }
`;

// header div
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  color: black;
  border-bottom: 1px solid black;
`;

// 로고 box
const Logo = styled.div`
  img {
    margin: 0;
    font-size: 20px;
    width: 200px;
  }
`;

// 회원가입, 로그인 div
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

// 로그인 버튼
const LoginButton = styled.button`
  color: black;
  cursor: pointer;
  font-size: 15pt;
  transition: all 0.5s;
  background: none;

  &:hover {
    text-decoration: underline;
  }
`;

// 회원가입 바로가기 버튼
const RegisterButton = styled.button`
  color: black;
  cursor: pointer;
  font-size: 15pt;
  transition: all 0.5s;
  background: none;

  &:hover {
    text-decoration: underline;
  }
`;

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <Header>
        <Wrapper>
          <Logo>
            <img src="src\style\img\logo.png"></img>
          </Logo>
        </Wrapper>
        <Wrapper>
          <LoginButton onClick={() => setShowModal(true)}>LOGIN</LoginButton>
          <RegisterButton>REGISTER</RegisterButton>
        </Wrapper>
      </Header>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </Container>
  );
};

export default App;
