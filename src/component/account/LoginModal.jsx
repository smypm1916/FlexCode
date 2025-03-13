import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FindId from "./FindId";
import FindPw from "./FindPw";
import styled from "styled-components";

import {
  Container_Modal,
  Input_Box,
  Input_Style,
  Modal_Wrapper,
  Title,
} from "../../style/Common_Style";

import { Link_box } from "../../style/Modal_Style";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button_Modal_Login = styled.button`
  width: -webkit-fill-available;
  background-color: ${(props) => (props.primary ? "white" : "white")};
  color: ${(props) => (props.primary ? "black" : "black")};
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.5s;
  border: 1px solid black;
  border-radius: 0;
  letter-spacing: 1px;
  background-color: none;

  &:hover {
    background-color: ${(props) => (props.primary ? "black" : "black")};
    color: ${(props) => (props.primary ? "#BB9393" : "white")};
    border-color: black;
    text-decoration: none;
  }

  &:focus {
    outline: none;
  }
`;

const ButtonClose = styled.div`
  padding: 0;
`;

const Conwrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LoginModal = ({ onClose }) => {
  const style = {
    display: "flex",
  };

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  const [isFindId, setIsFindId] = useState(false);
  const [isFindPw, setIsFindPw] = useState(false);

  const handleFindId = () => {
    setIsFindId(true);
    setIsFindPw(false);
  };

  const handleFindPw = () => {
    setIsFindPw(true);
    setIsFindId(false);
  };

  const handleBackToLogin = () => {
    setIsFindId(false);
    setIsFindPw(false);
  };

  const handleSignUp = () => {
    navigate("/signup");
    onClose();
  };

  return isFindId ? (
    <Container_Modal>
      <FindId onBack={handleBackToLogin} />
    </Container_Modal>
  ) : isFindPw ? (
    <Container_Modal>
      <FindPw onBack={handleBackToLogin} />
    </Container_Modal>
  ) : (
    <Container_Modal>
      <Modal_Wrapper>
        <ButtonContainer>
          <ButtonClose onClick={onClose}>
            <img src="src/style/img/closebutton.png" alt="닫기 버튼" />
          </ButtonClose>
        </ButtonContainer>
        <Title>LOGIN</Title>
        <Conwrapper>
          <Input_Box>
            <Input_Style type="text" placeholder="ID" />
          </Input_Box>
          <Input_Box>
            <Input_Style type="password" placeholder="PW" />
          </Input_Box>
          <Link_box>
            {/* ✅ 회원가입 클릭 시 signup 페이지로 이동 */}
            <a onClick={() => navigate("/signup")}>회원가입</a>
            <a onClick={handleFindId}>ID 찾기</a>
            <a onClick={handleFindPw}>비밀번호 찾기</a>
          </Link_box>
        </Conwrapper>
        <ButtonContainer>
          <Button_Modal_Login primary>LOGIN</Button_Modal_Login>
        </ButtonContainer>
      </Modal_Wrapper>
    </Container_Modal>
  );
};

export default LoginModal;
