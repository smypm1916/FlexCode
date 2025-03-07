import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FindId from "./FindId";
import FindPw from "./FindPw";
import styled from "styled-components";

const Container = styled.div`
  top: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25); /* 반투명 배경 */
  backdrop-filter: blur(5px); /* 배경 블러 효과 */
  z-index: 1000; /* 다른 요소들 위에 배치 */
  flex-wrap: wrap;
  transition: ;
`;

const LoginContainer = styled.div`
  width: 40%;
  margin: 50px auto;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  color: black;
  letter-spacing: 1px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 21px;
  flex-wrap: wrap;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Title = styled.h2`
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
    <Container>
      <FindId onBack={handleBackToLogin} />
    </Container>
  ) : isFindPw ? (
    <Container>
      <FindPw onBack={handleBackToLogin} />
    </Container>
  ) : (
    <Container>
      <LoginContainer>
        <ButtonContainer>
          <ButtonClose onClick={onClose}>
            <img src="src/style/img/closebutton.png" alt="닫기 버튼" />
          </ButtonClose>
        </ButtonContainer>
        <Title>LOGIN</Title>
        <Conwrapper>
          <InputField type="text" placeholder="ID" />
          <InputField type="password" placeholder="PW" />
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
      </LoginContainer>
    </Container>
  );
};

export default LoginModal;
