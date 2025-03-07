import { useState } from "react";
import { PaginationComponent } from "./PaginationComponent";
import Searchbox from "../common/Searchbox";
import Select from "../common/Select";
import styled from "styled-components";

// 버튼 스타일
const Button = styled.button`
  height: 45px;
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

// 커뮤니티 메인 페이지
const Wrapper = styled.div`
  max-width: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
  gap: 20px;
`;

// 상단 광고
const Container01 = styled.div`
  width: 100%;
  height: 100px;
  background-color: #bb9393;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const Search_Box = styled.div`
  height: fit-content;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
  align-items: center;
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

  const searchOptions = [
    { value: "opTitle", label: "제목" },
    { value: "opUser", label: "작성자" },
  ];

  return (
    <div className="CmContainer">
      <div className="cmTopAd">상단 광고</div>
      <div className="CmSearch">
        <div className="SearchSelect">
          <Select
            className="search"
            options={searchOptions}
            onChange={(e) => setSelected(e.target.value)}
            defaultValue=""
          />
        </div>
        <div className="SearchInput">
          <Searchbox />
        </div>
      </div>
      <div>상품 리뷰</div>
      <Wrapper>
        <Container01>상단 광고</Container01>
        <Title>REVIEW</Title>
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
            <Button>SEARCH</Button>
          </Search_Box>
        </Input_Wrapper>

        <ul>
          {paginatedPosts.map((post) => (
            <li key={post.id} className="border p-2 mb-2">
              {post.profile} {post.title} {post.img} {post.user} {post.date}
            </li>
          ))}
        </ul>
        <Wrapper></Wrapper>
        <Button_Box>
          <Button>글쓰기</Button>
        </Button_Box>
        {/* ✅ 페이징 컴포넌트 추가 */}
        <PaginationComponent
          totalItems={dummyPosts.length}
          itemsPerPage={cnt}
          onPageChange={setPageNum}
        />
      </Wrapper>
    </div>
  );
};

export default CmMain;
