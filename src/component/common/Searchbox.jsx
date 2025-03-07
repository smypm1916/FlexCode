import React from "react";
import styled from "styled-components";

// search의 컨테이너
const Container02 = styled.div`
  width: 100%;
  max-width: 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// search의 제목
const Title = styled.h2`
  width: 80%;
  text-align: left;
  color: black;
  margin: 0;
  letter-spacing: 2px;
`;

// search의 검색창
const Search_Box = styled.div`
  width: -webkit-fill-available;
  height: fit-content;
  display: grid;
  grid-template-columns: 5.5fr 1fr;
  gap: 20px;
  align-items: center;
`;

// search의 검색창 input
const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 12pt;
  color: black;
  background: white;
  border: none;

  &:focus {
    outline: none;
  }

  &::file-selector-button {
    font-size: 12pt;
    border: 1px solid black;
    color: black;
    background-color: white;
    transition: all 0.5s;
  }

  &::file-selector-button:hover {
    background-color: black;
    color: white;
  }
`;

// search의 검색창 input을 감싸는 div
const Input_Box = styled.div`
  width: -webkit-fill-available;
  border: none;
  border-bottom: 1px solid black;
  padding: 10px;
  text-align: left;
`;

// search의 검색창 버튼
const Button = styled.button`
  padding: 10px;
  border: 1px solid black;
  transition: all 0.5s;
  color: black;
  background-color: white;
  text-decoration: none;
  font-size: 12pt;
  &:hover {
    background-color: black;
    color: white;
    text-decoration: none;
  }
`;

// 메인페이지, 커뮤니티 사용예정
const onSearch = (value) => {
  console.log(value);
};

const Searchbox = ({ onSearch }) => {
  return (
    <Container02>
      <Title>SEARCH</Title>
      <Search_Box>
        <Input_Box>
          <Input
            type="search"
            placeholder="검색어 입력"
            onChange={(e) => onSearch(e.target.value)}
          />
        </Input_Box>
        <Button>검색</Button>
      </Search_Box>
    </Container02>
  );
};

export default Searchbox;
