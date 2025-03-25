import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container_Style, Input_Box, Title } from "../../style/Common_Style";
import { Search_Box } from "../../style/SearchBox_Style";
import Button from "./Button";
import TextInput from "./TextInput";

const Searchbox = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const searchHandleChange = (e) => {
    setKeyword(e.target.value);
  }

  const searchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/search`, {
        params: { keyword }
      });
      console.log("검색결과:", res.data);
    } catch (err) {
      setError("검색 중 오류 발생");
    }
  };

  useEffect(() => {
    searchProduct();
  }, []);

  return (
    <Container_Style>
      <Title>SEARCH</Title>
      <Search_Box>
        <Input_Box>
          <TextInput
            type="search"
            name="keyword"
            placeholder="검색어 입력"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Input_Box>
        <Button onClick={searchProduct} btnTxt="검색" />
      </Search_Box>
    </Container_Style>
  );
};

export default Searchbox;
