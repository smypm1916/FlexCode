import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import DeleteUser from "./DeleteUser";
import UserOrders from "./UserOrders";
import UserCommunitys from "./UserCommunitys";
import { jwtDecode } from "jwt-decode";
import { fetchGetCommunity } from "../myPage/MyPageAPI";
import { fetchGetOrder } from "../myPage/MyPageAPI";

const MyPageMain = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userNickname, setUserNickname] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserEmail(decoded.email);
      setUserNickname(decoded.nickname);

      fetchGetCommunity(decoded.nickname);
      fetchGetOrder(decoded.email);
    }
  }, []);

  return (
    <div>
      <UserProfile />
      <UserOrders email={userEmail} />
      <UserCommunitys nickname={userNickname} />
      <DeleteUser />
    </div>
  );
};

export default MyPageMain;
