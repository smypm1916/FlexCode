import {
  Button_Wrapper_100,
  Container_Style,
  Input_Wrapper,
  Wrapper,
} from "../../style/Common_Style";
import Button from "../common/Button";
import { List_Profile, Profile_Img } from "../../style/List_Style";

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
    <Wrapper>
      <Container_Style>
        {posts.map((post) => (
          <List_Profile key={post.community_id}>
            <Profile_Img>프사</Profile_Img>
            <label>유저</label>
          </List_Profile>
        ))}

        <Input_Wrapper>
          <div>
            <label>작성일</label>
          </div>
          <div>25/03/05</div>
        </Input_Wrapper>
        <Input_Wrapper>
          <label>제목</label>
          <div className="CmTitle">{post.community_title}</div>
        </Input_Wrapper>

        <Input_Wrapper>
          <div>
            <label>내용</label>
          </div>
          <div className="CmContent">
            <div>{post.community_content}</div>
            <div>
              {" "}
              {post.cm_img && (
                <img src={post.community_img} alt="업로드 이미지" width="200" />
              )}
            </div>
          </div>
        </Input_Wrapper>
        <Input_Wrapper>
          <div>
            <label>작성일</label>
          </div>
          <div>{post.community_date}</div>
        </Input_Wrapper>
        <Button_Wrapper_100>
          <Button btnTxt={"수정하기"}>수정하기</Button>
          <Button btnTxt={"삭제하기"}>삭제하기</Button>
        </Button_Wrapper_100>
      </Container_Style>
    </Wrapper>
  );
};
export default CmDetail;
