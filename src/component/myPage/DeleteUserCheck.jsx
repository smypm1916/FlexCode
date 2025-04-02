import React, { useState, useEffect } from "react";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button_Wrapper_100,
  Container_Style,
  Input_Box,
  Title,
  Wrapper,
} from "../../style/Common_Style";

const DeleteUserCheck = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserEmail(decoded.email);
    }
  });

  const handleCheckPw = async (e) => {
    e.preventDefault();
    console.log("유저 이메일:", userEmail);
    console.log("입력한 비밀번호:", userPassword);
    if (!userPassword) {
      alert("Please Enter your Password");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email: userEmail,
          password: userPassword,
        }
      );

      console.log("회원정보 조회 서버 응답:", response.data);

      if (response.data.success) {
        console.log("회원정보조회 정상");
        handleDeleteUser();
      } else {
        alert("Do Not Match Passwords");
        setUserPassword("");
      }
    } catch (error) {
      console.error("회원정보 조회 요청 실패:", error);
      alert("Server Error");
    }
  };

  const handleDeleteUser = async (e) => {
    console.log("회원정보 삭제 API 요청 들어옴");
    // e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/deleteUserAccount",
        {
          email: userEmail,
        }
      );

      console.log("회원정보 삭제 서버 응답:", response.data);

      if (response.data.success) {
        alert("Your account information has been deleted.");
        sessionStorage.removeItem("token");
        navigate("/");
      } else {
        alert("Failed to delete account information.");
      }
    } catch (error) {
      console.error("회원정보 삭제 요청 실패:", error);
      alert("Server Error");
    }
  };

  return (
    <Wrapper className="wrap" id="delete">
      <Container_Style className="wrap gap">
        <Title>Delete Account</Title>
        <Input_Box>
          <TextInput
            type={"password"}
            name={"password"}
            placeholder={"Please Enter your Password"}
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </Input_Box>
        <Button_Wrapper_100 className="grid1">
          <Button
            className={"deleteUser"}
            btnTxt={"Delete Account"}
            onClick={handleCheckPw}
          />
        </Button_Wrapper_100>
      </Container_Style>
    </Wrapper>
  );
};

export default DeleteUserCheck;
