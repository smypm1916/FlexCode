import styled from "styled-components";
const Post = styled.div`
  width: 100%;
  height: 100px;
  background: white;
  color: black;
  transition: all 0.5s;
  border-top: 1px solid black;
  font-size: 15pt;
  font-weight: bold;
  display: flex;
  &:hover {
    background-color: #d9d9d9;
  }
  div {
    padding: 10px;
  }
`;

const CmPost = ({ post }) => {
  return (
    <Post key={post.community_no}>
      <div>{post.community_title}</div>
      <div>{post.community_img}</div>
      <div>작성자 {post.user_nickname}님</div>
      <div>날짜 {post.community_date}</div>
    </Post>
  );
};

export default CmPost;
