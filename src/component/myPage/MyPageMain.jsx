import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import DeleteUser from "./DeleteUser";
import UserOrders from "./UserOrders";
import UserCommunitys from "./UserCommunitys";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const MyPageMain = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [communitys, setCommunitys] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserEmail(decoded.email);
      setUserNickname(decoded.nickname);

      fetchGetCommunity(decoded.nickname);
    }
  }, []);

  const fetchGetCommunity = async (nickname) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/getUserCommunitys",
        {
          nickname: nickname,
        }
      );
      if (response.data.success) {
        setCommunitys(response.data.result);
      } else {
        alert("조회된 글 없음.");
        setCommunitys([]);
      }
    } catch (error) {
      console.error("회원 커뮤니티글 조회 실패:", error);
      alert("회원 커뮤니티 글 조회 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <UserProfile />
      <UserOrders />
      <UserCommunitys communitys={communitys} />
      <DeleteUser />
    </div>
  );
};

export default MyPageMain;
