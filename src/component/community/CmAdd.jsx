import { useState } from "react";
import axios from "axios";

const CmAdd = () => {
  const [community_title, setTitle] = useState("");
  const [community_content, setContent] = useState("");
  const [community_img, setImg] = useState(null);

  const handleImg = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("community_title", community_title);
    formData.append("community_content", community_content);
    if (community_img) {
      formData.append("community_img", community_img);
    }

    try {
      await axios.post("http://localhost:5000/api/write", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("글 작성 성공!");
    } catch (error) {
      console.error("글 작성 실패:", error);
    }
  };

  return (
    <div className="CmAddContainer">
      <div>프로필사진</div>
      <form onSubmit={handleSubmit}>
        <div className="CmAddTitle">
          <div>
            <label>제목</label>
          </div>
          <div className="CmInputTitle">
            <input
              type="text"
              name="community_title"
              value={community_title}
              placeholder="제목을 입력하세요"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="CmAddDescription">
          <div>
            <label>내용</label>
          </div>
          <div className="CmInputDescription">
            <textarea
              name="community_content"
              value={community_content}
              placeholder="내용을 입력하세요"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <div className="CmInputFlie">
          <label>사진 등록</label>
          <input type="file" onChange={handleImg} />
        </div>
        <div className="CmBddBtn">
          <button type="submit">등록하기</button>
          <button>뒤로가기</button>
        </div>
      </form>
    </div>
  );
};
export default CmAdd;
