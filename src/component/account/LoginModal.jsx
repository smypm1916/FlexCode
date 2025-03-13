import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FindId from "./FindId";
import FindPw from "./FindPw";
import styled from "styled-components";

import TextInput from "../common/TextInput";
import axios from "axios";

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

const InputField = styled.div`
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

  const [loginForm, setLoginForm] = useState({
    login_email: "",
    login_password: "",
  });

  const { login_email, login_password } = loginForm;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // 필수 입력값 확인
    if (!login_email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!login_password) {
      alert("패스워드를 입력해주세요.");
      return;
    }

    try {
      // 로그인 API 요청
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email: login_email,
          password: login_password,
        }
      );
      console.log("로그인 응답:", response.data);

      // 로그인 성공 시 토큰 저장 & 메인 페이지 이동
      if (response.data.success) {
        sessionStorage.setItem("token", response.data.token); // JWT 토큰 저장
        sessionStorage.setItem(
          "profile",
          response.data.profile || "default-profile.png"
        );
        alert("로그인 성공");
        navigate("/"); // 메인 페이지로 이동
        onClose();
      } else {
        console.log(response.data.message);
        alert("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      alert("이메일 또는 패스워드를 확인해주세요.");
      setLoginForm({
        login_email: "",
        login_password: "",
      });
    }
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
          <InputField>
            <TextInput
              type={"text"}
              name={"login_email"}
              placeholder={"EMAIL"}
              value={login_email}
              onChange={handleChange}
            />
          </InputField>
          <InputField>
            <TextInput
              type={"password"}
              name={"login_password"}
              placeholder={"PW"}
              value={login_password}
              onChange={handleChange}
            />
          </InputField>
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
          <Button primary onClick={handleLogin}>
            LOGIN
          </Button>
        </ButtonContainer>
      </LoginContainer>
    </Container>
  );
};

export default LoginModal;
