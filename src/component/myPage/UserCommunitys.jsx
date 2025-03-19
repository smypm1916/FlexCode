import React from "react";
import defaultImg from "../../assets/imgs/default-profile.png";
import { useNavigate } from "react-router-dom";

const UserCommunitys = ({ communitys }) => {
  const navigate = useNavigate();

  if (!communitys) {
    return <h2>로딩 중...</h2>; // 데이터가 로드되기 전 상태
  }

  if (Array.isArray(communitys) && communitys.length === 0) {
    return <h2>작성한 커뮤니티 글이 없습니다.</h2>;
  }

  return communitys.length > 0 ? (
    <div>
      <h2>작성한 커뮤니티글</h2>
      <h3
        onClick={() => {
          navigate("/userCommunity-list", { state: { communitys } });
        }}
      >
        더보기
      </h3>
      <ul>
        {communitys.slice(0, 3).map((post) => {
          // 이미지 경로를 import해야 사용할 수 있음
          let imagePath;
          try {
            imagePath = require(`../assets/imgs/${post.COMMUNITY_IMG}`); // 이미지 파일 동적 import
          } catch (error) {
            imagePath = defaultImg; // 이미지가 없으면 기본 이미지 사용
          }

          return (
            <li key={post.COMMUNITY_NO}>
              <div>{post.COMMUNITY_TITLE}</div>
              {/* 이미지 표시 */}
              <img
                src={imagePath}
                alt="커뮤니티 이미지"
                style={{ width: "30px", height: "30px" }}
              />
              <div>
                {new Date(post.COMMUNITY_DATE).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </div>
              <div>{post.COMMUNITY_READCNT}</div>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <h2>작성한 커뮤니티 글이 없습니다.</h2>
  );
};

export default UserCommunitys;
