import styled from "styled-components";

// search의 컨테이너
export const Container02 = styled.div`
  width: 100%;
  max-width: 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// search의 검색창
export const Search_Box = styled.div`
  width: -webkit-fill-available;
  height: fit-content;
  display: grid;
  grid-template-columns: 5.5fr 1fr;
  gap: 20px;
  align-items: center;
`;

// search의 검색창 input을 감싸는 div
export const Input_Box = styled.div`
  width: -webkit-fill-available;
  border: none;
  border-bottom: 1px solid black;
  padding: 10px;
  text-align: left;
`;
