import React from "react";
import {
  Button_Style,
  Input_Style,
  Container_Style,
  Title,
} from "../../style/Common_Style";
import { Search_Box, Input_Box } from "../../style/SearchBox_Style";

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
          <Input_Style
            type="search"
            placeholder="검색어 입력"
            onChange={(e) => onSearch(e.target.value)}
          />
        </Input_Box>
        <Button_Style>검색</Button_Style>
      </Search_Box>
    </Container_Style>
  );
};

export default Searchbox;
