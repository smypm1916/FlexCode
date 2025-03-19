import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../common/Button";
import {
  List_Content,
  List_Column,
  List_Profile,
  Profile_Img,
} from "../../style/List_Style";
import { Pagination_List } from "../../style/Community_Style";

const UserCommunityList = () => {
  const location = useLocation();
  const [communitys, setCommunitys] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.communitys) {
      console.log("state에서 데이터 설정 완료");
      setCommunitys(location.state.communitys);
    } else {
      console.log("location.state가 없음 → 기본 데이터 사용");
      setCommunitys([]); // 기본값을 빈 배열로 설정
    }
  }, [location.state]);
  console.log("communitys 데이터:", communitys);

  if (!communitys) {
    return <h2>로딩 중...</h2>; // 데이터가 로드되기 전 상태
  }

  if (Array.isArray(communitys) && communitys.length === 0) {
    return <h2>작성한 커뮤니티 글이 없습니다.</h2>;
  }

  return communitys.length > 0 ? (
    <div>
      <h2>작성한 커뮤니티글</h2>
      <ul>
        {communitys.map((post) => {
          return (
            <Pagination_List
              //   onClick={() => navigate("/CmPost")}
              key={post.COMMUNITY_NO}
              className="border p-2 mb-2"
            >
              <List_Column key={post.COMMUNITY_NO}>
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
            </Pagination_List>
          );
        })}
      </ul>
      <div>
        <Button
          className={"returnToMyPage"}
          btnTxt={"마이페이지"}
          onClick={() => {
            navigate("/mypage");
          }}
        />
      </div>
      ;
    </div>
  ) : (
    <div>
      <h2>작성한 커뮤니티 글이 없습니다.</h2>
      <div>
        <Button
          className={"returnToMyPage"}
          btnTxt={"마이페이지"}
          onClick={() => {
            navigate("/mypage");
          }}
        />
      </div>
    </div>
  );
};

export default UserCommunityList;
