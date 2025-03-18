import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FindId from "./FindId";
import FindPw from "./FindPw";
import styled from "styled-components";
import axios from "axios";

import {
  Container_Modal,
  Input_Box,
  Input_Style,
  Modal_Wrapper,
  Title,
} from "../../style/Common_Style";

import { Link_box } from "../../style/Modal_Style";
import TextInput from "../common/TextInput";

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
  font-size: 12pt;
  transition: all 0.5s;
  border: 1px solid black;
  border-radius: 0;
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
            <TextInput
              type={"text"}
              name={"login_email"}
              placeholder={"EMAIL"}
              value={login_email}
              onChange={handleChange}
            />
          </Input_Box>
          <Input_Box>
            <TextInput
              type={"password"}
              name={"login_password"}
              placeholder={"PW"}
              value={login_password}
              onChange={handleChange}
            />
          </Input_Box>
          {/* <Link_box>
            <div>
              ✅ 회원가입 클릭 시 signup 페이지로 이동
              <a onClick={() => navigate("/signup")}>회원가입</a>
            </div>
            <div>
              <a onClick={handleFindId}>이메일 찾기</a>
            </div>
            <div>
              <a onClick={handleFindPw}>비밀번호 찾기</a>
            </div>
          </Link_box> */}
          {/* <Input_Box>
            <Input_Style type="text" placeholder="ID" />
          </Input_Box>
          <Input_Box>
            <Input_Style type="password" placeholder="PW" />
          </Input_Box> */}
          <Link_box>
            {/* ✅ 회원가입 클릭 시 signup 페이지로 이동 */}
            <a onClick={() => navigate("/signup")}>회원가입</a>
            <a onClick={handleFindId}>ID 찾기</a>
            <a onClick={handleFindPw}>비밀번호 찾기</a>
          </Link_box>
        </Conwrapper>
        <ButtonContainer>
          <Button_Modal_Login primary onClick={handleLogin}>
            LOGIN
          </Button_Modal_Login>
        </ButtonContainer>
      </Modal_Wrapper>
    </Container_Modal>
  );
};

export default LoginModal;
