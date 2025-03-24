import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginModal from "../account/LoginModal";
import Button from "../common/Button";
import {
  Button_Wrapper_100,
  Container_Style,
  Wrapper,
} from "../../style/Common_Style";

const SignUpSuccess = () => {
  const navigate = useNavigate();

  const style = {
    display: "flex",
    transition: "all 0.5s",
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <Wrapper className="wrap" id="success">
      <Container_Style className="RegComplete">
        <div className="signUpSuccess-message">회원가입이 완료되었습니다!</div>
        <Button_Wrapper_100 className="grid2">
          <Button
            className={"login"}
            btnTxt={"로그인"}
            onClick={() => setShowModal(true)}
          />
          {showModal && <LoginModal onClose={() => setShowModal(false)} />}
          <Button
            className={"linkIndex"}
            btnTxt={"메인페이지"}
            onClick={() => navigate("/")}
          />
        </Button_Wrapper_100>
      </Container_Style>
    </Wrapper>
  );
};

export default SignUpSuccess;
