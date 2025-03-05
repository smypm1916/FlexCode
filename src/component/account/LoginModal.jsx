import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FindId from "./FindId";
import FindPw from "./FindPw";

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
    <FindId onBack={handleBackToLogin} />
  ) : isFindPw ? (
    <FindPw onBack={handleBackToLogin} />
  ) : (
    <div className="loginPage">
      <div className="login-logo">LOGO</div>
      <div className="login-title">
        <h2>LOGIN</h2>
      </div>
      <div className="login-id">
        <input type="text" placeholder="ID" />
      </div>
      <div className="login-pw">
        <input type="password" placeholder="PW" />
      </div>
      <div className="login-links" style={style}>
        <div className="login-link-join">
          <a href="#" onClick={handleSignUp}>
            회원가입
          </a>
        </div>
        <div className="login-link-idSearch">
          <a href="#" onClick={handleFindId}>
            ID 찾기
          </a>
        </div>
        <div className="login-link-pwSearch">
          <a href="#" onClick={handleFindPw}>
            비밀번호 찾기
          </a>
        </div>
      </div>
      <div className="login-btns">
        <button>LOGIN</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default LoginModal;
