import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Headerdiv,
  LoginButton,
  Logo,
  Menu,
  Menu_Wrapper,
  Menu,
  Button_Login,
  Button_Register,
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
          <Button_Login onClick={() => setShowModal(true)}>LOGIN</Button_Login>
          <Button_Register>REGISTER</Button_Register>
        </Menu_Wrapper>
      </Headerdiv>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </Container>
  );
};

export default App;
