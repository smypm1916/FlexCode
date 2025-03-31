import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  List_Content,
  List_Column,
  List_Profile,
  Profile_Img,
} from "../../style/List_Style";
import { Pagination_List } from "../../style/Community_Style";
import axios from "axios";

const CmPost = ({ handleSubmit, post }) => {
  const navigate = useNavigate();
  const imgPath = import.meta.env.VITE_IMG_PATH;

  const handleClick = async () => {
    try {
      console.log("조회수 증가 요청 보냄");
      console.log(post.COMMUNITY_NO);
      await axios.post(
        `http://localhost:8080/api/post/increaseView/${post.COMMUNITY_NO}`
      );
      console.log("조회수 증가 완료" + response);
    } catch (error) {
      console.error("조회수 증가 실패:", error);
    }
    navigate("/CmDetail/" + post.COMMUNITY_NO, { state: handleSubmit });
  };

  return (
    <Pagination_List
      onClick={handleClick}
      key={post.COMMUNITY_NO}
      className="border p-2 mb-2"
    >
      <List_Column key={post.COMMUNITY_NO}>
        <List_Profile>
          <Profile_Img>
            <img src={`${imgPath}/${post.USER_PROFILE}`} />
          </Profile_Img>
        </List_Profile>
        <p>{post.COMMUNITY_TITLE}</p>
        <List_Profile>
          <p>작성자</p>
          <p>{post.USER_NICKNAME}</p>
        </List_Profile>
        <List_Profile>
          <p>작성일자</p>
          <p>{post.COMMUNITY_DATE}</p>
        </List_Profile>
      </List_Column>
      <List_Content>
        {post.COMMUNITY_IMG ? (
          <img src={`${imgPath}/${post.COMMUNITY_IMG}`} />
        ) : null}
        <List_Profile>
          <p>조회수</p>
          <p>{post.COMMUNITY_READCNT}</p>
        </List_Profile>
      </List_Content>
    </Pagination_List>
  );
};

export default CmPost;
