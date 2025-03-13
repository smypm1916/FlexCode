import React from "react";
import { Container_Style, Title, Input_Box } from "../../style/Common_Style";
import { Search_Box } from "../../style/SearchBox_Style";
import TextInput from "./TextInput";
import Button from "./Button";

// 메인페이지, 커뮤니티 사용예정
const onSearch = (value) => {
  console.log(value);
};

const Searchbox = ({ onSearch }) => {
  return (
    <Container_Style>
      <Title>SEARCH</Title>
      <Search_Box>
        <Input_Box>
          <TextInput
            type="search"
            placeholder="검색어 입력"
            onChange={(e) => onSearch(e.target.value)}
          />
        </Input_Box>
        <Button btnTxt={"검색"}>검색</Button>
      </Search_Box>
    </Container_Style>
  );
};

export default Searchbox;
