import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { User_Status_Row, Wrapper_Post } from "../../style/Mypage_Style";

const DeleteUser = () => {
  const navigate = useNavigate();

  return (
    <Wrapper_Post>
      <User_Status_Row className="grid2">
        <p>
          탈퇴하시겠습니까? 개인 정보 보호 약관에 따라 개인 정보가 파기됩니다.
        </p>
        <Button
          className={"deleteUser"}
          btnTxt={"회원탈퇴"}
          onClick={() => navigate("/deleteAccount")}
        />
      </User_Status_Row>
    </Wrapper_Post>
  );
};

export default DeleteUser;
