import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import DeleteUser from "./DeleteUser";
import UserOrders from "./UserOrders";
import UserCommunitys from "./UserCommunitys";
import { jwtDecode } from "jwt-decode";
import { fetchGetCommunity } from "../myPage/MyPageAPI";
import { fetchGetOrder } from "../myPage/MyPageAPI";
import { Container_Style, Wrapper } from "../../style/Common_Style";
import { User_Status_Row, Order_Status } from "../../style/Mypage_Style";

const MyPageMain = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserEmail(decoded.email);
      setUserNickname(decoded.nickname);
      setUserProfile(decoded.profile);

      fetchGetCommunity(decoded.nickname);
      fetchGetOrder(decoded.email);
    }
  }, []);

  return (
    <Wrapper className="wrap" id="mypage">
      <Container_Style>
        <UserProfile
          email={userEmail}
          nickname={userNickname}
          profile={userProfile}
        />
      </Container_Style>
      <Container_Style className="wrap">
        <UserOrders
          email={userEmail}
          nickname={userNickname}
          profile={userProfile}
        />
      </Container_Style>
      <Container_Style className="wrap">
        <UserCommunitys nickname={userNickname} profile={userProfile} />
      </Container_Style>
      <Container_Style className="wrap">
        <DeleteUser />
      </Container_Style>
    </Wrapper>
  );
};

export default MyPageMain;
