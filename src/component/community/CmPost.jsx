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
  const imgPath = import.meta.env.VITE_IMG_PATH;
  const imgStyle = {
    width: "100px",
  };
  return (
    <Post key={post.COMMUNITY_NO}>
      <div>{post.COMMUNITY_TITLE}</div>
      <div>
        <img style={imgStyle} src={`${imgPath}/${post.COMMUNITY_IMG}`} />
      </div>
      <div>작성자 {post.USER_NICKNAME}님</div>
      <div>날짜 {post.COMMUNITY_DATE}</div>
    </Post>
  );
};

export default CmPost;
