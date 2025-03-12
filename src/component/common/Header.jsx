import React, { useState } from "react";
import styled from "styled-components";
import LoginModal from "../account/LoginModal";
import {
  Container,
  Headerdiv,
  Wrapper,
  Logo,
  Menu_Wrapper,
  Menu,
  Button_Login,
  Button_Register,
} from "../../style/Header_Style";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <Headerdiv>
        <Wrapper>
          <Logo>
            <img src="src\style\img\logo.png"></img>
          </Logo>
          <Menu_Wrapper>
            <Menu>HOME</Menu>
            <Menu>COMMUNITY</Menu>
          </Menu_Wrapper>
        </Wrapper>
        <Menu_Wrapper>
          <Button_Login onClick={() => setShowModal(true)}>LOGIN</Button_Login>
          <Button_Register>REGISTER</Button_Register>
        </Menu_Wrapper>
      </Headerdiv>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </Container>
  );
};

export default App;
