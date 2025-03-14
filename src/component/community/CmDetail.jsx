import {
  Button_Wrapper_100,
  Container_Style,
  Input_Wrapper,
  Wrapper,
} from "../../style/Common_Style";
import Button from "../common/Button";
import {
  List_Content,
  List_Profile,
  Profile_Img,
} from "../../style/List_Style";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const CmDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const imgPath = import.meta.env.VITE_IMG_PATH;
  const fetchPost = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/post/DetailPage/${id}`
      );
      console.log(response.data[0]);

      setPost(response.data[0]);
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    console.log(id);
    fetchPost(id);
  }, [id]);
  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <Wrapper className="cm" id="post">
      <Container_Style>
        <List_Profile>
          <Profile_Img>프사</Profile_Img>
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
          <div className="CmTitle">{post.COMMUNITY_TITLE}</div>
        </Input_Wrapper>
        <Input_Wrapper>
          <div>
            <label>내용</label>
          </div>
          <List_Content>
            <div>{post.COMMUNITY_CONTENT}</div>
            <div>
              <img src={`${imgPath}/${post.COMMUNITY_IMG}`} />
            </div>
          </List_Content>
        </Input_Wrapper>
        <Button_Wrapper_100>
          <Button btnTxt={"수정하기"}>수정하기</Button>
          <Button btnTxt={"삭제하기"}>삭제하기</Button>
        </Button_Wrapper_100>
        {/* ))} */}
      </Container_Style>
    </Wrapper>
  );
};
export default CmDetail;
