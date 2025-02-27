import React, { useState } from "react";
import LoginModal from "../account/LoginModal";

const Header = () => {
  const style = {
    display: "flex",
  };
  // 모달의 화면 표시여부 상태를 관리하는 객체
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="header" style={style}>
        <div className="header-content">
          <h3>Header</h3>
        </div>
        <div className="header-login-btn">
          <button onClick={() => setShowModal(true)}>LOGIN</button>
        </div>
      </div>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Header;
