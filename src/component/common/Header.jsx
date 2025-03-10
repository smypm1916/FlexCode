import React, { useState } from "react";
import styled from "styled-components";
import LoginModal from "../account/LoginModal";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Headerdiv,
  Wrapper,
  Logo,
  Menu_Wrapper,
  Menu,
  LoginButton,
  RegisterButton,
} from "../../style/Header_Style";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  return (
    <Container>
      <Headerdiv>
        <Wrapper>
          <Logo>
            <img src="src\style\img\logo.png"></img>
          </Logo>
          <Menu_Wrapper>
            <Menu>HOME</Menu>
            <Menu onClick={() => navigate("/community")}>COMMUNITY</Menu>
          </Menu_Wrapper>
        </Wrapper>
        <Menu_Wrapper>
          <LoginButton onClick={() => setShowModal(true)}>LOGIN</LoginButton>
          <RegisterButton>REGISTER</RegisterButton>
        </Menu_Wrapper>
      </Headerdiv>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </Container>
  );
};

export default App;
