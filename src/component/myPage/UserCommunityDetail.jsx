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
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import FileUpload from "../common/FileUpload";
import { jwtDecode } from "jwt-decode";
import { Order_Wrapper } from "../../style/Mypage_Style";

const UserCommunityDetail = () => {
  const token = sessionStorage.getItem("token");
  const decoded = jwtDecode(token);
  const [nickname, setNickname] = useState("");
  const [communitys, setCommunitys] = useState([]);
  const location = useLocation();

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
      navigate("/userCommunity-list", {
        state: { nickname },
      });
    }
  };
  const updateHandler = async () => {
    setEditMode((mode) => !mode);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_nickname", nickname);
    formData.append("community_title", community_title);
    formData.append("community_content", community_content);
    formData.append("community_no", id);
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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchPost(id);

      navigate(`/userCommunity_detail/${post.COMMUNITY_NO}`, {
        state: { communitys },
      });
      setEditMode(false);
    } catch (error) {
      console.error("작성 실패:", error);
    }
  };
  useEffect(() => {
    fetchPost(id);
  }, [id]);
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper className="wrap" id="post">
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
                  />
                </>
              )
            ) : null}
            <Button
              type="button"
              onClick={() => {
                navigate("/userCommunity-list", { state: { nickname } });
              }}
              btnTxt={"목록으로"}
            />
          </Button_Wrapper_100>
        </Container_Style>
      </form>
    </Wrapper>
  );
};

export default UserCommunityDetail;
