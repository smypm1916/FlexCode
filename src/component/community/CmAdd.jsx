import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const CmAdd = () => {
  const [community_title, setTitle] = useState("");
  const [community_content, setContent] = useState("");
  const [community_img, setImg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_nickname", "hamu");
    formData.append("community_title", community_title);
    formData.append("community_content", community_content);
    if (community_img) {
      formData.append("community_img", community_img);
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/post/write",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log(formData);
      console.log("작성 성공:", response.data);
      console.log(response);
    } catch (error) {
      console.error("작성 실패:", error);
    }
  };

  return (
    <div className="CmAddContainer">
      <div>프로필사진</div>
      <form onSubmit={handleSubmit}>
        <div className="CmAddTitle">
          <label>제목</label>
          <input
            type="text"
            name="community_title"
            value={community_title}
            placeholder="제목을 입력하세요"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="CmAddDescription">
          <label>내용</label>
          <textarea
            name="community_content"
            value={community_content}
            placeholder="내용을 입력하세요"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="CmAddFlie">
          <label>사진 등록</label>
          <input type="file" onChange={(e) => setImg(e.target.files[0])} />
        </div>
        <div className="CmBddBtn">
          <button type="submit">등록하기</button>
          <button type="button" onClick={() => navigate("/community")}>
            뒤로가기
          </button>
        </div>
      </form>
    </div>
  );
};
export default CmAdd;
