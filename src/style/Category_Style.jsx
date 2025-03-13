import styled from "styled-components";

// 카테고리 컨테이너 제목
export const Title = styled.h2`
  text-align: left;
  color: black;
  margin: 0;
  letter-spacing: 2px;
`;

// 카테고리 컨테이너
export const Container03 = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

// 카테고리 컨테이너 안에서 카테고리를 감싸는 div
export const Category_Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
`;

// 카테고리 컨텐츠 박스
export const Category_Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  transition: all 0.5s;
  border: 1px solid rgba(0, 0, 0, 0.1);
  &:hover {
    border: none;
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);
  }
`;
