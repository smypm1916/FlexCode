import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginModal from "../account/LoginModal";
import Button from "../common/Button";

const SignUpSuccess = () => {
  const navigate = useNavigate();

  const style = {
    display: "flex",
    transition: "all 0.5s",
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="signUpSuccess-container">
      <div className="signUpSuccess-message">회원가입이 완료되었습니다!</div>
      <div className="signUpSuccess-buttons" style={style}>
        <div className="signUpSuccess-login">
          <Button
            className={"login"}
            btnTxt={"로그인"}
            onClick={() => setShowModal(true)}
          />
          {showModal && <LoginModal onClose={() => setShowModal(false)} />}
        </div>
        <div className="signUpsuccess-main">
          <Button
            className={"linkIndex"}
            btnTxt={"메인페이지"}
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpSuccess;
