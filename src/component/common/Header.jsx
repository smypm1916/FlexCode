import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wrapper_Header,
  Logo,
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
    <Wrapper_Header>
      {/* 전체를 감싸는 wrapper div */}

      <Logo onClick={() => navigate("/")}>
        <img src="src\style\img\logo.png"></img>
      </Logo>
      <Menu_Wrapper>
        <Menu onClick={() => navigate("/")}>HOME</Menu>
        <Menu onClick={() => navigate("/community")}>COMMUNITY</Menu>
      </Menu_Wrapper>

      <Menu_Wrapper>
        <Button_Login onClick={() => setShowModal(true)}>LOGIN</Button_Login>
        <Button_Register onclick={() => navigate("/signup")}>
          REGISTER
        </Button_Register>
      </Menu_Wrapper>

      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </Wrapper_Header>
  );
};

export default App;
