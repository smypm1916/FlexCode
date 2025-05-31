import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button_Wrapper_100,
  Container_Style,
  Wrapper,
} from "../../style/Common_Style";
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
    <Wrapper className="wrap nomargin" id="success">
      <Container_Style className="RegComplete wrap">
        <div className="signUpSuccess-message">会員登録が完了しました</div>
        <Button_Wrapper_100 className="grid2">
          <Button
            className={"login"}
            btnTxt={"ログイン"}
            onClick={() => setShowModal(true)}
          />
          {showModal && <LoginModal onClose={() => setShowModal(false)} />}
          <Button
            className={"linkIndex"}
            btnTxt={"メインページ"}
            onClick={() => navigate("/")}
          />
        </Button_Wrapper_100>
      </Container_Style>
    </Wrapper>
  );
};

export default SignUpSuccess;
