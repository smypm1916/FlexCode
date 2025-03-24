import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../common/Button";
import { Wrapper } from "../../style/Common_Style";
// mypage용 통합 스타일
import {} from "../../style/Mypage_Style";
import { User_Status_Column, User_Status_Row } from "../../style/Mypage_Style";
const UserProfile = () => {
  const [profileImg, setProfileImg] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [email, setEmail] = useState(null);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);

      const profilePath = decoded.profile
        ? `http://localhost:8080/uploads/${decoded.profile}`
        : "http://localhost:8080/uploads/default-profile.png";

      setProfileImg(profilePath);
      setNickname(decoded.nickname);
      setEmail(decoded.email);
    }
  }, [sessionStorage.getItem("token")]);

  const handleGetUser = async (e) => {
    e.preventDefault();
    const user_email = email;

    try {
      // 회원 정보 조회 API 요청
      const response = await axios.post(
        "http://localhost:8080/api/users/getUser",
        {
          email: user_email,
        }
      );
      console.log("회원 정보 조회 응답:", response.data);

      if (response.data.success) {
        alert("회원정보 조회 성공!");

        const userInfo = response.data.result[0];

        // 이메일 분리
        const [email_id, email_address] = userInfo.USER_EMAIL.split("@");

        // 주소 분리
        const [base_address, detail_address] = userInfo.USER_ADDR.split(",");

        // 전화번호 분리
        const [first_tel, mid_tel, last_tel] = userInfo.USER_TEL.split("-");

        const formattedUserData = {
          ...userInfo,
          USER_EMAIL: { email_id, email_address },
          USER_ADDR: { base_address, detail_address },
          USER_TEL: { first_tel, mid_tel, last_tel },
        };

        setUserData(formattedUserData);

        setTimeout(() => {
          navigate("/modifyUser", { state: formattedUserData });
          setUserData(null);
        }, 100);
      } else {
        console.log(response.data.message);
        alert("회원정보 조회 실패!");
      }
    } catch (error) {
      console.error("회원정보 조회 요청 실패:", error);
      alert("API 요청에 실패하였습니다.");
    }
  };

  return (
    <Wrapper className="mypageCon">
      <User_Status_Row>
        <img src={profileImg} alt="profile"></img>
        <User_Status_Column>
          <User_Status_Row className="grid2">
            <p>{nickname}님</p>
            <Button
              className={"updateUser"}
              btnTxt={"회원정보 수정"}
              onClick={handleGetUser}
            />
          </User_Status_Row>
          <User_Status_Row className="grid2">
            <p>{email}</p>
          </User_Status_Row>
        </User_Status_Column>
      </User_Status_Row>
    </Wrapper>
  );
};

export default UserProfile;
