import { useEffect, useState } from "react";

const CmDetail = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.log("게시글 불러오기 실패:", error);
      }
    };
    fetchPosts();
  }, []);

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
