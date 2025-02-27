const LoginModal = ({ onClose }) => {
  const style = {
    display: "flex",
  };

  return (
    <div className="loginPage">
      <div className="login-logo">LOGO</div>
      <div className="login-title">LOGIN</div>
      <div className="login-id">
        <input type="text" placeholder="ID" />
      </div>
      <div className="login-pw">
        <input type="password" placeholder="PW" />
      </div>
      <div className="login-links" style={style}>
        <div className="login-link-join">회원가입</div>
        <div className="login-link-idSearch">ID 찾기</div>
        <div className="login-link-pwSearch">비밀번호 찾기</div>
      </div>
      <div className="login-btns">
        <button>LOGIN</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default LoginModal;
