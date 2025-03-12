import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Headerdiv,
  LoginButton,
  Logo,
  Menu,
  Menu_Wrapper,
  RegisterButton,
  Wrapper,
} from "../../style/Header_Style";
import LoginModal from "../account/LoginModal";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  return (
    <Container>
      <Headerdiv>
        <Wrapper>
          <Logo onClick={() => navigate("/")}>
            <img src="src\style\img\logo.png"></img>
          </Logo>
          <Menu_Wrapper>
            <Menu onClick={() => navigate("/")}>HOME</Menu>
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
