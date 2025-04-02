import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { User_Status_Row, Wrapper_Post } from "../../style/Mypage_Style";

const DeleteUser = () => {
  const navigate = useNavigate();

  return (
    <User_Status_Row className="grid2">
      <p>
        Do you want to withdraw your account? Your personal data will be deleted
        according to our privacy policy.
      </p>
      <Button
        className={"deleteUser"}
        btnTxt={"Delete Account"}
        onClick={() => navigate("/deleteAccount")}
      />
    </User_Status_Row>
  );
};

export default DeleteUser;
