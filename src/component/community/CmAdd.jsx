import {
  Button_Wrapper_100,
  Container_Style,
  Input_Box,
  Input_Style,
  Input_Wrapper,
  Textarea_Style,
  Wrapper,
  Title,
} from "../../style/Common_Style";
import { List_Profile, Profile_Img } from "../../style/List_Style";
import Button from "../common/Button";
import FileUpload from "../common/FileUpload";
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
    <Wrapper className="cmadd">
      <Container_Style>
        <form onSubmit={handleSubmit}>
          <Title>WRITE</Title>
          <List_Profile>
            <Profile_Img>프사</Profile_Img>
          </List_Profile>
          <Input_Wrapper>
            <div className="CmAddTitle"></div>
            <div>
              <label>제목</label>
            </div>
            <Input_Box>
              <Input_Style type="text" placeholder="제목을 입력하세요" />
            </Input_Box>
          </Input_Wrapper>

          <Input_Wrapper>
            <div>
              <label>내용</label>
            </div>
            <Input_Box>
              <Textarea_Style
                type="textarea"
                name="community_content"
                value={community_content}
                placeholder="내용을 입력하세요"
                onChange={(e) => setContent(e.target.value)}
              />
            </Input_Box>
          </Input_Wrapper>
          <Input_Wrapper>
            <label>사진 등록</label>
            <input type="file" onChange={(e) => setImg(e.target.files[0])} />
            <Input_Box>
              <FileUpload type="file" />
            </Input_Box>
          </Input_Wrapper>
          <Button_Wrapper_100>
            <Button btnTxt={"글쓰기"}>글쓰기</Button>
            <Button btnTxt={"뒤로가기"} onClick={() => navigate("/community")}>
              뒤로가기
            </Button>
          </Button_Wrapper_100>
        </form>
      </Container_Style>
    </Wrapper>
  );
};
export default CmAdd;
