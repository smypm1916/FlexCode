import { useState } from "react";
import { PaginationComponent } from "./PaginationComponent";
import styled from "styled-components";
import {
  Button_After,
  Button_Before,
  Button_Pagination,
  Pagination_List,
  Pagination_Wrapper,
  Search_Box,
  Container01,
} from "../../style/Community_Style";
import Button from "../common/Button";
import { Container_Style, Wrapper } from "../../style/Common_Style";
import {
  List_Column,
  List_Content,
  List_Profile,
  Profile_Img,
} from "../../style/List_Style";

// button을 감싸는 div
const Button_Box = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

// select 스타일
const Select = styled.select`
  height: 45px;
  font-size: 12pt;
  padding: 10px;
  background-color: white;
  color: black;
  border: 1px solid black;

  &.optionList {
    border-radius: 0;
  }
`;

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

// input이 포함된 열을 감싸는 div
const Input_Wrapper = styled.div`
  width: -webkit-fill-available;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 45px;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2`
  width: 100%;
  text-align: left;
  color: black;
  margin: 0;
  letter-spacing: 2px;
`;

const dummyPosts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  profile: `프사`,
  title: `게시글 ${i + 1}`,
  img: `이미지`,
  user: `작성자`,
  date: `25/03/04`,
}));

const CmMain = () => {
  const [selected, setSelected] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const cnt = 6; // 한 페이지당 개수

  // 현재 페이지 게시글 필터링
  const start = dummyPosts.length - cnt * (pageNum - 1);
  const end = pageNum === Math.ceil(dummyPosts.length / cnt) ? -1 : start - cnt;
  const paginatedPosts = dummyPosts.slice(end + 1, start).reverse();

  return (
    <Wrapper className="community">
      <Container_Style>
        <Container01>상단 광고</Container01>
        <Title>COMMUNITY</Title>
        <Input_Wrapper>
          <div className="search-select">
            <Select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="opTitle">제목</option>
              <option value="opUser">작성자</option>
            </Select>
          </div>
          <Search_Box>
            <Input_Box>
              <Input type="text" placeholder="search" />
            </Input_Box>
            <Button btnTxt={"SEARCH"}>SEARCH</Button>
          </Search_Box>
        </Input_Wrapper>

        <ul>
          {paginatedPosts.map((post) => (
            <Pagination_List key={post.id} className="border p-2 mb-2">
              <List_Column>
                <List_Profile>
                  <Profile_Img>{post.profile}</Profile_Img>
                  <p>{post.user}</p>
                  <p>{post.title}</p>
                </List_Profile>
                <p>{post.date}</p>
              </List_Column>
              <List_Content>
                <p>{post.img}</p>{" "}
              </List_Content>
            </Pagination_List>
          ))}
        </ul>
        <Button_Box>
          <Button btnTxt={"글쓰기"}>글쓰기</Button>
        </Button_Box>
        {/* ✅ 페이징 컴포넌트 추가 */}
        <PaginationComponent
          totalItems={dummyPosts.length}
          itemsPerPage={cnt}
          onPageChange={setPageNum}
        />
      </Container_Style>
    </Wrapper>
  );
};

export default CmMain;
