import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import {
  Button_Bucket,
  Button_Log,
  Button_Register,
  Logo,
  Menu,
  Menu_Wrapper,
  ProfileWrapper,
  Wrapper_Header,
} from "../../style/Header_Style";
import { Profile_Img } from "../../style/List_Style";
import LoginModal from "../account/LoginModal";
import { useCart } from "./useCart";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const { tempOrderId, fetchCart, refreshCart } = useCart();
  // const [isLoading, setIsLoading] = useState(true); // 로딩상태
  const navigate = useNavigate();
  // 로그인 상태 확인
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
      const decoded = jwtDecode(token);
      console.log("디코딩된 토큰 정보:", decoded);

      setIsLoggedIn(true);

      const imgPath = import.meta.env.VITE_IMG_PATH;

      const profilePath = decoded.profile
        ? `${imgPath}/${decoded.profile}`
        : `${imgPath}/default-profile.png`;

      console.log("프로필 이미지 경로:", profilePath);

      setProfileImg(profilePath);
    } else {
      setIsLoggedIn(false);
      setProfileImg(null);
    }
  }, [sessionStorage.getItem("token"), sessionStorage.getItem("profile")]);

  // WebSocket연결
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

    const profilePath = profile
      ? `http://localhost:8080/uploads/${profile}`
      : "http://localhost:8080/uploads/default-profile.png";

    setIsLoggedIn(true);
    setProfileImg(profilePath);
  };

  // 로그아웃 기능
  const handleLogout = () => {
    sessionStorage.removeItem("token"); // 토큰 삭제
    sessionStorage.removeItem("profile"); // 프로필 이미지 삭제
    localStorage.removeItem("tempOrderId");
    console.log("로그아웃성공 ui 전환들어옴");
    setIsLoggedIn(false);
    setProfileImg(null);
    // window.location.reload(); // 페이지 새로고침으로 상태 초기화
    navigate("/");
  };

  return (
    <Wrapper_Header>
      <Logo onClick={() => navigate("/")}>
        <img src="/src/assets/imgs/logo.png"></img>
      </Logo>
      <Menu_Wrapper>
        <Menu onClick={() => navigate("/")}>HOME</Menu>
        <Menu onClick={() => navigate("/community")}>COMMUNITY</Menu>
      </Menu_Wrapper>
      {/* <Menu_Wrapper>
        <Button_Login onClick={() => setShowModal(true)}>LOGIN</Button_Login>
        <Button_Register onClick={() => navigate("/signUp")}>
          REGISTER
        </Button_Register>
      </Menu_Wrapper> */}
      {/* 로그인 여부에 따라 UI 변경 */}
      {isLoggedIn ? (
        <Menu_Wrapper>
          <ProfileWrapper onClick={() => navigate("/mypage")}>
            {/* Profile_Img로/profile 이미지 표시요청 */}
            <Profile_Img>
              <img src={`${profileImg}`} alt="profile" />
            </Profile_Img>
          </ProfileWrapper>
          {/* Button_Bucket으로 변경 */}
          <Button_Bucket
            onClick={async () => {
              await fetchCart(); // 장바구니 상태를 최신으로 업데이트
              const latestTempOrderId = localStorage.getItem("tempOrderId");
              navigate(`/order/${latestTempOrderId}`);
            }}
          >
            CART
          </Button_Bucket>
          {/* Button_Logout으로 수정, Button_Login/Logout = Button_Log로 통합 */}
          <Button_Log onClick={handleLogout}>LOGOUT</Button_Log>
        </Menu_Wrapper>
      ) : (
        <Menu_Wrapper>
          <Button_Log onClick={() => setShowModal(true)}>LOGIN</Button_Log>
          <Button_Register onClick={() => navigate("/signup")}>
            REGISTER
          </Button_Register>
        </Menu_Wrapper>
      )}
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </Wrapper_Header>
  );
};

export default App;
