import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CmDetail = () => {
  const { COMMUNITY_NO } = useParams();
  const [posts, setPosts] = useState();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/DetailPage/${COMMUNITY_NO}`, {
        params: { postNum: COMMUNITY_NO },
      });
      setPosts(response.data);
    } catch (error) {
      console.err("게시글 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [COMMUNITY_NO]);

  return (
    <div className="CmDetailContainer">
      {posts.map((post) => (
        <div key={post.community_id}>
          <div className="CmDetailTop">
            <div>유저프로필</div>
            <div>
              <label>제목</label>
            </div>
            <div className="CmTitle">{post.community_title}</div>
          </div>

          <div className="CmDetailMid">
            <div>
              <label>내용</label>
            </div>
            <div className="CmContent">
              <div>{post.community_content}</div>
              <div>
                {" "}
                {post.cm_img && (
                  <img
                    src={post.community_img}
                    alt="업로드 이미지"
                    width="200"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="CmDetailBottom">
            <div>
              <label>작성일</label>
            </div>
            <div>{post.community_date}</div>
          </div>
        </div>
      ))}
      <div className="CmDetailBtn">
        <button>수정하기</button>
        <button>삭제하기</button>
      </div>
    </div>
  );
};
export default CmDetail;
