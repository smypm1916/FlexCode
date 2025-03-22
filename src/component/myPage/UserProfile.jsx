import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../common/Button";

const UserProfile = ({ email, nickname, profile }) => {
  const [userProfileImg, setUserProfileImg] = useState(null);
  const [userNickname, setUserNickname] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setUserEmail(email);
    setUserNickname(nickname);

    const imgPath = import.meta.env.VITE_IMG_PATH;

    const profilePath = profile
      ? `${imgPath}/${profile}`
      : `${imgPath}/default-profile.png`;

    setUserProfileImg(profilePath);
  });

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
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div>
        <img src={userProfileImg} alt="profile"></img>
      </div>
      <div>
        <div>{userNickname}님</div>
        <div>{userEmail}</div>
        <div>
          <Button
            className={"updateUser"}
            btnTxt={"회원정보 수정"}
            onClick={handleGetUser}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
