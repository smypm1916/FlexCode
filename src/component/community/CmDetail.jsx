import {
  Button_Wrapper_100,
  Container_Style,
  Input_Box,
  Input_Style,
  Input_Wrapper,
  Textarea_Style,
  Wrapper,
} from "../../style/Common_Style";
import Button from "../common/Button";
import {
  List_Content,
  List_Profile,
  Profile_Img,
} from "../../style/List_Style";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FileUpload from "../common/FileUpload";
import { jwtDecode } from "jwt-decode";

const CmDetail = () => {
  const storedToken = sessionStorage.getItem("token");
  let decoded = null;
  if (storedToken) {
    try {
      decoded = jwtDecode(storedToken);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (decoded?.nickname) {
      setNickname(decoded.nickname);
    }
  }, [decoded]);

  const { id } = useParams();
  const [post, setPost] = useState();
  const imgPath = import.meta.env.VITE_IMG_PATH;
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [community_title, setTitle] = useState("");
  const [community_content, setContent] = useState("");
  const [community_img, setImg] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const fetchPost = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/post/DetailPage/${id}`
      );
      setPost(response.data[0]);
      setTitle(response.data[0].COMMUNITY_TITLE);
      setContent(response.data[0].COMMUNITY_CONTENT);
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
    }
  };
  const deleteHandler = async () => {
    let ok = confirm("really?");
    if (ok) {
      const response = await axios.delete(
        `http://localhost:8080/api/post/delete/${id}`
      );
      console.log(response.data);
      navigate("/community");
    }
  };
  const updateHandler = async () => {
    setEditMode((mode) => !mode);
  };
  const handleSubmit = async (e) => {
    console.log("제출");
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_nickname", nickname);
    formData.append("community_title", community_title);
    formData.append("community_content", community_content);
    formData.append("community_no", id);
    console.log(community_title);
    console.log(community_content);
    if (community_img) {
      formData.append("community_img", community_img);
    }
    try {
      const response = await axios.put(
        "http://localhost:8080/api/post/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // 수정된 값 즉시 반영 → 딜레이 방지
      setPost((prev) => ({
        ...prev,
        COMMUNITY_TITLE: community_title ?? prev.COMMUNITY_TITLE,
        COMMUNITY_CONTENT: community_content ?? prev.COMMUNITY_CONTENT,
        COMMUNITY_IMG: community_img
          ? URL.createObjectURL(community_img)
          : prev.COMMUNITY_IMG,
      }));
      setUpdateTrigger((prev) => !prev);
      setEditMode(false);
    } catch (error) {
      console.error("작성 실패:", error);
    }
  };
  useEffect(() => {
    fetchPost(id);
  }, [id, updateTrigger]);
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper className="cm" id="post">
      <form onSubmit={handleSubmit}>
        <Container_Style>
          <List_Profile>
            <Profile_Img>
              <img src={`${imgPath}/${post.USER_PROFILE}`} />
            </Profile_Img>
            <label>{post.USER_NICKNAME}</label>
          </List_Profile>
          <Input_Wrapper>
            <div>
              <label>작성일</label>
            </div>
            <div>{post.COMMUNITY_DATE}</div>
          </Input_Wrapper>
          <Input_Wrapper>
            <label>제목</label>
            {editMode ? (
              <Input_Box>
                <Input_Style
                  type="text"
                  name="community_title"
                  value={community_title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Input_Box>
            ) : (
              <div className="CmTitle">{post.COMMUNITY_TITLE}</div>
            )}
          </Input_Wrapper>
          <Input_Wrapper>
            <div>
              <label>내용</label>
            </div>
            <List_Content>
              {!editMode ? (
                <div>{post.COMMUNITY_CONTENT}</div>
              ) : (
                <Input_Box>
                  <Textarea_Style
                    type="textarea"
                    name="community_content"
                    value={community_content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Input_Box>
              )}
              {editMode ? (
                <Input_Box>
                  <FileUpload
                    type="file"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </Input_Box>
              ) : post.COMMUNITY_IMG ? (
                <img src={`${imgPath}/${post.COMMUNITY_IMG}`} />
              ) : null}
            </List_Content>
          </Input_Wrapper>
          <Button_Wrapper_100>
            {nickname === post.USER_NICKNAME ? (
              editMode ? (
                <>
                  <Button
                    type="button"
                    onClick={() => setEditMode(!editMode)}
                    btnTxt={"취소"}
                  />
                  <Button type="submit" btnTxt={"완료"} />
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={updateHandler}
                    btnTxt={"수정하기"}
                  />
                  <Button
                    type="button"
                    onClick={deleteHandler}
                    btnTxt={"삭제하기"}
                  >
                    삭제하기
                  </Button>
                </>
              )
            ) : null}
          </Button_Wrapper_100>
        </Container_Style>
      </form>
    </Wrapper>
  );
};
export default CmDetail;
