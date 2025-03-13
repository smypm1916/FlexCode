import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import styled from "styled-components";
import LoginModal from "../account/LoginModal";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Headerdiv,
  LoginButton,
  Logo,
  Menu,
  Menu_Wrapper,
  RegisterButton,
  ProfileWrapper, // 추가
  ProfileImg,
  LogoutButton,
  Wrapper,
} from "../../style/Header_Style";
// import Cart from "./Cart";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  // const [isLoading, setIsLoading] = useState(true); // 로딩상태
  const navigate = useNavigate();
  // 로그인 상태 확인
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const profile = sessionStorage.getItem("profile") || "default-profile.png";
    console.log(token);
    if (token) {
      const decoded = jwtDecode(token);
      console.log("디코딩된 토큰 정보:", decoded);
      setIsLoggedIn(true);
      setProfileImg(`http://localhost:8080/uploads/${profile}`);
    } else {
      setIsLoggedIn(false);
      setProfileImg(null);
    }
    // setIsLoading(false); // 로딩 완료 후 상태 변경
  }, [sessionStorage.getItem("token"), sessionStorage.getItem("profile")]);

  // WebSocket연결(한번만실행)
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const socket = io("http://localhost:8080", {
      auth: { token }, // WebSocket 연결 시 JWT 토큰 전송
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("WebSocket 연결 성공:", socket.id);
    });

    socket.on("forceLogout", () => {
      console.log("서버에서 강제 로그아웃됨");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("profile");
      setIsLoggedIn(false);
      setProfileImg(null);
      window.location.reload();
    });
    return () => {
      if (socket.connected) {
        console.log("WebSocket 연결 해제:", socket.id);
        socket.disconnect();
      }
    };
  }, []);

  // 로그인 성공 시 처리
  const handleLoginSuccess = (token, profile) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("profile", profile || "default-profile.png");
    console.log("로그인성공 ui 전환들어옴");
    setIsLoggedIn(true);
    setProfileImg(
      `http://localhost:8080/uploads/${profile || "default-profile.png"}`
    );
  };

  // 로그아웃 기능
  const handleLogout = () => {
    sessionStorage.removeItem("token"); // 토큰 삭제
    sessionStorage.removeItem("profile"); // 프로필 이미지 삭제
    console.log("로그아웃성공 ui 전환들어옴");
    setIsLoggedIn(false);
    setProfileImg(null);
    window.location.reload(); // 페이지 새로고침으로 상태 초기화
  };

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
        {/* 로그인 여부에 따라 UI 변경 */}
        {isLoggedIn ? (
          <Menu_Wrapper>
            <Menu onClick={() => navigate("/cart")}>CART</Menu>
            <ProfileWrapper onClick={() => navigate("/mypage")}>
              <ProfileImg src={profileImg} alt="profile" />
            </ProfileWrapper>
            <LogoutButton onClick={handleLogout}>LOGOUT</LogoutButton>
          </Menu_Wrapper>
        ) : (
          <Menu_Wrapper>
            <LoginButton onClick={() => setShowModal(true)}>LOGIN</LoginButton>
            <RegisterButton onClick={() => navigate("/signup")}>
              REGISTER
            </RegisterButton>
          </Menu_Wrapper>
        )}
        {/*로그인 모달에 로그인 성공 시 호출할 함수 전달 */}
      </Headerdiv>
      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </Container>
  );
};

export default App;
