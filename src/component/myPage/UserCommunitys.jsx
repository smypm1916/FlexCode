import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  List_Content,
  List_Column,
  List_Profile,
  Profile_Img,
} from "../../style/List_Style";
import { fetchGetCommunity } from "../myPage/MyPageAPI";
import { User_Status_Row, Wrapper_Post } from "../../style/Mypage_Style";
import { Text, Title } from "../../style/Product_Detail_Style";
import { Input_Wrapper } from "../../style/Common_Style";

const UserCommunitys = ({ nickname, profile }) => {
  console.log("넘겨받은 닉네임:", nickname);
  console.log("넘겨받은 프로필사진:", profile);

  const [communitys, setCommunitys] = useState([]);
  const [userProfileImg, setUserProfileImg] = useState(null);
  const navigate = useNavigate();
  const imgPath = import.meta.env.VITE_IMG_PATH;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGetCommunity(nickname); // 데이터 가져오기
      console.log("요청 닉네임:", nickname);
      console.log("받아온 데이터:", data);
      setCommunitys(data); // 상태 업데이트

      profile
        ? setUserProfileImg(profile)
        : setUserProfileImg("default-profile.png");
    };
    fetchData();
  }, [nickname, profile]);

  if (Array.isArray(communitys) && communitys.length === 0) {
    return <Title>작성한 커뮤니티 글이 없습니다.</Title>;
  }
  return communitys.length > 0 ? (
    <Wrapper_Post className="nonePadding borderBottom">
      <User_Status_Row className="borderBottom">
        <Title>나의 커뮤니티</Title>

        <Text
          className="more"
          onClick={() => {
            navigate("/userCommunity-list", {
              state: { nickname, profile },
            });
          }}
        >
          더보기
        </Text>
      </User_Status_Row>
      {communitys.slice(0, 3).map((post) => {
        return (
          <>
            <List_Column
              onClick={() =>
                navigate(`/userCommunity_detail/${post.COMMUNITY_NO}`, {
                  state: { communitys },
                })
              }
              key={post.COMMUNITY_NO}
              className="border p-2 mb-2"
            >
              <Profile_Img>
                <img src={`${imgPath}/${userProfileImg}`} />
              </Profile_Img>
              <p>{post.COMMUNITY_TITLE}</p>
              <List_Profile>
                <p>작성자</p>
                <p>{post.USER_NICKNAME}</p>
              </List_Profile>
              <List_Profile>
                <p>작성일자</p>
                <p>
                  {" "}
                  {new Date(post.COMMUNITY_DATE).toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
              </List_Profile>
            </List_Column>
            <List_Content>
              {post.COMMUNITY_IMG ? (
                <img src={`${imgPath}/${post.COMMUNITY_IMG}`} />
              ) : (
                <p></p>
              )}
            </List_Content>
          </>
        );
      })}
    </Wrapper_Post>
  ) : (
    <Wrapper_Post>
      <Title>나의 커뮤니티</Title>
      <Title>작성한 커뮤니티 글이 없습니다.</Title>
    </Wrapper_Post>
  );
};

export default UserCommunitys;
