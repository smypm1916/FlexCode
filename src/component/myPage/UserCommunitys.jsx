import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  List_Content,
  List_Column,
  List_Profile,
  Profile_Img,
} from "../../style/List_Style";
import fetchGetCommunity from "../myPage/MyPageAPI";

const UserCommunitys = ({ nickname }) => {
  console.log("넘겨받은 닉네임:", nickname);

  const [communitys, setCommunitys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGetCommunity(nickname); // 데이터 가져오기
      console.log("요청 닉네임:", nickname);
      console.log("받아온 데이터:", data);
      setCommunitys(data); // 상태 업데이트
    };
    fetchData();
  }, [nickname]);

  if (Array.isArray(communitys) && communitys.length === 0) {
    return <h2>작성한 커뮤니티 글이 없습니다.</h2>;
  }
  return communitys.length > 0 ? (
    <div>
      <h2>작성한 커뮤니티글</h2>
      <h3
        onClick={() => {
          navigate("/userCommunity-list", {
            state: { nickname },
          });
        }}
      >
        더보기
      </h3>
      <ul>
        {communitys.slice(0, 3).map((post) => {
          return (
            <div>
              <List_Column
                onClick={() =>
                  navigate(`/userCommunity_detail/${post.COMMUNITY_NO}`, {
                    state: { communitys },
                  })
                }
                key={post.COMMUNITY_NO}
                className="border p-2 mb-2"
              >
                <List_Profile>
                  <Profile_Img></Profile_Img>
                </List_Profile>
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
                  <img src={`../assets/imgs//${post.COMMUNITY_IMG}`} />
                ) : (
                  <p>이미지 없음</p>
                )}
              </List_Content>
            </div>
          );
        })}
      </ul>
    </div>
  ) : (
    <h2>작성한 커뮤니티 글이 없습니다.</h2>
  );
};

export default UserCommunitys;
