import React, { useState } from "react";
import styled from "styled-components";
import LoginModal from "../account/LoginModal";

//상단의 header 전체를 묶는 div
const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  transition: all 0.5s;
  z-index: 100;
`;

// header div
const Header = styled.div`
  display: flex;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  color: black;
  border-bottom: 1px solid black;
  transition: all 0.5s;
  &:hover {
    background: white;
  }
`;

// 로고 box
const Logo = styled.div`
  img {
    margin: 0;
    font-size: 20px;
    width: 150px;
  }

  &::after {
    transition: 0.5s;
    content: "";
    width: 0;
    height: 1px;
    display: block;
    background: black;
  }

  &:hover::after {
    width: 100%;
  }
`;

// 회원가입, 로그인 div
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

// 로그인 모달열기 버튼
const LoginButton = styled.button`
  display: inline-block;
  color: black;
  cursor: pointer;
  font-size: 12pt;
  transition: all 0.5s;
  background: none;

  &:hover {
    text-decoration: none;
  }

  &::after {
    transition: 300ms;
    content: "";
    width: 0;
    height: 1px;
    display: block;
    background: black;
  }

  &:hover::after {
    width: 100%;
  }
`;

// 회원가입 바로가기 버튼
const RegisterButton = styled.button`
  color: black;
  cursor: pointer;
  font-size: 12pt;
  transition: all 0.5s;
  background: none;

  &:hover {
    text-decoration: none;
  }

  &::after {
    transition: 0.5s;
    content: "";
    width: 0;
    height: 1px;
    display: block;
    background: black;
  }

  &:hover::after {
    width: 100%;
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
