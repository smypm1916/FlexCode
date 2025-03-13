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
    <Wrapper className="cm" id="post">
      <Container_Style>
        {/* {posts.map((post) => ( */}
        {/* <List_Profile key={post.community_id}> */}
        <List_Profile>
          <Profile_Img>프사</Profile_Img>
          <label>유저</label>
        </List_Profile>
        <Input_Wrapper>
          <div>
            <label>작성일</label>
          </div>
          <div>25/03/05</div>
        </Input_Wrapper>
        <Input_Wrapper>
          <label>제목</label>
          <div className="CmTitle">제목입니다</div>
        </Input_Wrapper>
        <Input_Wrapper>
          <div>
            <label>내용</label>
          </div>
          <List_Content>
            {/* <div>{post.community_content}</div> */}
            <div>post.community_content</div>
            <div>
              {/* {" "}
                  {post.cm_img && (
                    <img
                      src={post.community_img}
                      alt="업로드 이미지"
                      width="200"
                    />
                  )} */}
              <img />
            </div>
          </List_Content>
        </Input_Wrapper>
        <Input_Wrapper>
          <div>
            <label>작성일</label>
          </div>
          {/* <div>{post.community_date}</div> */}
          <div>post.community_date</div>
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
