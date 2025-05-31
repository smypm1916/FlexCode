import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FindId from "./FindId";
import FindPw from "./FindPw";

import {
  Container_Modal,
  Input_Box,
  Input_Style,
  Modal_Wrapper,
  Title,
} from "../../style/Common_Style";

import { Link_box } from "../../style/Modal_Style";
import { useCart } from "../common/useCart";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button_Modal_Login = styled.button`
  width: -webkit-fill-available;
  background-color: ${(props) => (props.$primary ? "white" : "white")};
  color: ${(props) => (props.$primary ? "black" : "black")};
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
  console.log("onClose 確認:", onClose);

  const { refreshCart } = useCart();
  const navigate = useNavigate();

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

  const handleClose = () => {
    try {
      onClose();
    } catch (error) {
      console.error("onClose 失敗:", error);
    }
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
      alert("EMAILを入力してください。");
      return;
    }
    if (!login_password) {
      alert("パスワードを入力してください。");
      return;
    }

    try {
      // ログインAPIリクエスト
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email: login_email,
          password: login_password,
        }
      );
      console.log("로그인 응답:", response.data);
      // ログイン成功時にカートをマージング
      if (response.data.success) {
        // ログイン成功時にトークを保存

        // ローカルストレージにトークン保存
        const token = response.data.token;
        sessionStorage.setItem("token", token);

        // ゲストセッション
        const guestSessionId = localStorage.getItem("tempOrderId");

        // カートマージAPIリクエスト
        const cartMergeResponse = await axios.post(
          "http://localhost:8080/api/cart/auth/login",
          { user_email: login_email, guestSessionId },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (cartMergeResponse.data.success) {
          // 新規 tempOrderId 保存
          const newTempOrderId = cartMergeResponse.data.tempOrderId;

          // tempOrderIdとカート更新
          await refreshCart(newTempOrderId);

          navigate("/");
          onClose();
        } else {
          console.error("カートマージング失敗", cartMergeResponse.data.message);
          alert("カートマージング失敗");
          navigate("/");
          onClose();
        }
      } else {
        console.log(response.data.exists);
        alert("EMAILまたはパスワードが間違っています。");
        setLoginForm({
          login_email: "",
          login_password: "",
        });
      }
    } catch (error) {
      console.error("ログイン・リクエスト失敗:", error);
      alert("EMAILまたはパスワードが間違っています。");
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
    <Container_Modal
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <Modal_Wrapper>
        <ButtonContainer>
          <ButtonClose onClick={handleClose}>
            <img src="src/style/img/closebutton.png" alt="閉じる" />
          </ButtonClose>
        </ButtonContainer>
        <Title>ログイン</Title>
        <Conwrapper>
          <Input_Box>
            <Input_Style
              type={"text"}
              name={"login_email"}
              placeholder={"EMAIL"}
              value={login_email || ""}
              onChange={handleChange}
            />
          </Input_Box>
          <Input_Box>
            <Input_Style
              type={"password"}
              name={"login_password"}
              placeholder={"PW"}
              value={login_password || ""}
              onChange={handleChange}
            />
          </Input_Box>
          <Link_box>
            <a
              onClick={() => {
                navigate("/signup");
                onClose();
              }}
            >
              会員登録
            </a>
            <a onClick={handleFindId}>ID探し</a>
            <a onClick={handleFindPw}>パスワード探し</a>
          </Link_box>
        </Conwrapper>
        <ButtonContainer>
          <Button_Modal_Login $primary onClick={handleLogin}>
            LOGIN
          </Button_Modal_Login>
        </ButtonContainer>
      </Modal_Wrapper>
    </Container_Modal>
  );
};

export default LoginModal;
