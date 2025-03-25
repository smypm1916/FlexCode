import React, { useState } from "react";
import { Container_Style, Input_Box, Title } from "../../style/Common_Style";
import { Search_Box } from "../../style/SearchBox_Style";
import Button from "./Button";
import TextInput from "./TextInput";

const Searchbox = ({ onSearch, onReset }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword.trim());
  };

  return (
    <Container_Style>
      <Title>SEARCH</Title>
      <Search_Box>
        <Input_Box>
          <TextInput
            type="search"
            placeholder="검색어 입력"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </Input_Box>
        <Button onClick={handleSearch} btnTxt="검색" />
        <Button onClick={() => {
          setKeyword("");
          onReset();
        }} btnTxt="초기화" />
      </Search_Box>
    </Container_Style>
  );
};

export default Searchbox;
