import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const DeleteUser = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        className={"deleteUser"}
        btnTxt={"회원탈퇴"}
        onClick={() => navigate("/deleteAccount")}
      />
    </div>
  );
};

export default DeleteUser;
