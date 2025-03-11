import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FindId from "./FindId";
import FindPw from "./FindPw";
import styled from "styled-components";

import {
  Container_Modal,
  Input_Box,
  Input_Style,
  Modal_Wrapper,
} from "../../style/Common_Style";

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const Title = styled.h2`
  font-size: 40pt;
  margin: 0;
  text-align: left;
`;

const InputField = styled.input`
  width: -webkit-fill-available;
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: white;
  border: 1px solid black;
  color: black;
  &:focus {
    outline: none;
  }
  &:placeholder {
    font-size: 12pt;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 12px;
  color: black;
  cursor: pointer;
  letter-spacing: 0;

  div:hover {
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
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
    color: ${(props) => (props.primary ? "white" : "white")};
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
          <LinksContainer>
            <div>
              {/* ✅ 회원가입 클릭 시 signup 페이지로 이동 */}
              <a onClick={() => navigate("/signup")}>회원가입</a>
            </div>
            <div>
              <a onClick={handleFindId}>ID 찾기</a>
            </div>
            <div>
              <a onClick={handleFindPw}>비밀번호 찾기</a>
            </div>
          </LinksContainer>
        </Conwrapper>
        <ButtonContainer>
          <Button primary>LOGIN</Button>
        </ButtonContainer>
      </Modal_Wrapper>
    </Container_Modal>
  );
};

export default LoginModal;
