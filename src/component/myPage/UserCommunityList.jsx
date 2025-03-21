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
import { fetchGetCommunity } from "../myPage/MyPageAPI";

const UserCommunityList = () => {
  const [communitys, setCommunitys] = useState([]);
  const location = useLocation();
  const { nickname } = location.state || {}; // state에서 nickname 가져오기
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지당 5개씩 표시

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGetCommunity(nickname); // 데이터 가져오기
      console.log("요청 닉네임:", nickname);
      console.log("받아온 데이터:", data);
      setCommunitys(data); // 상태 업데이트
    };
    fetchData();
  }, [nickname]);

  console.log("communitys 데이터:", communitys);

  // 현재 페이지에서 보여줄 데이터 필터링
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = communitys.slice(indexOfFirstPost, indexOfLastPost);

  // 총 페이지 개수 계산
  const totalPages = Math.ceil(communitys.length / itemsPerPage);

  // if (!communitys) {
  //   return <h2>로딩 중...</h2>; // 데이터가 로드되기 전 상태
  // }

  if (Array.isArray(communitys) && communitys.length === 0) {
    return <h2>작성한 커뮤니티 글이 없습니다.</h2>;
  }

  return (
    <div>
      {communitys.length > 0 ? (
        <div>
          <h2>작성한 커뮤니티글</h2>
          <Button
            type="button"
            onClick={() => {
              navigate("/userCommunity_add", { state: { communitys } });
            }}
            btnTxt={"글쓰기"}
          />
          {currentPosts.length > 0}
          <ul>
            {currentPosts.map((post) => {
              return (
                <Pagination_List
                  onClick={() =>
                    navigate(`/userCommunity_detail/${post.COMMUNITY_NO}`, {
                      state: { communitys },
                    })
                  }
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
        </div>
      ) : (
        <div>
          <h2>작성한 커뮤니티 글이 없습니다.</h2>
        </div>
      )}
      {/* 페이지네이션 버튼 */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                margin: "0 5px",
                padding: "5px 10px",
                backgroundColor: currentPage === i + 1 ? "black" : "white",
                color: currentPage === i + 1 ? "white" : "black",
                border: "1px solid black",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
      <div>
        <Button
          className={"returnToMyPage"}
          btnTxt={"마이페이지"}
          onClick={() => navigate("/mypage")}
        />
      </div>
    </div>
  );
};

export default UserCommunityList;
