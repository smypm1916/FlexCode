import { useEffect, useState } from "react";
import { PaginationComponent } from "./PaginationComponent";
import Searchbox from "../common/Searchbox";
import Select from "../common/Select";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CmPost from "./CmPost";

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
const Select_Box = styled.select`
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

const CmMain = () => {
  const navigate = useNavigate();
  const cnt = 6; // 한 페이지당 개수
  const [selected, setSelected] = useState("opTitle");
  const [pageNum, setPageNum] = useState(1);
  const [allPosts, setAllPosts] = useState([]); // 원본 데이터 저장
  const [posts, setPosts] = useState([]);
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const filterPosts = () => {
    if (posts.length === 0) return [];
    // 12 - 3 * (1-1)    start = 12
    const start = posts.length - cnt * (pageNum - 1);
    12 / 3 ? -1 : 12 - 3;
    9;
    const end = pageNum === Math.ceil(posts.length / cnt) ? 0 : start - cnt;
    return posts.slice(end, start).reverse();
    9 + 1, 12;
  };
  const getPosts = async () => {
    console.log("진입?");
    const response = await axios.get("http://localhost:8080/api/post/paging");
    setAllPosts(response.data); // 원본 데이터 저장
    setPosts(response.data);
    console.log("전체 ---");
  };
  const searchOptions = [
    { value: "opTitle", label: "제목" },
    { value: "opUser", label: "작성자" },
  ];

  const searchHandler = () => {
    if (!searchKeyword) {
      setPosts(allPosts);
      return;
    }
    setPosts([]);
    const filtered = allPosts.filter((post) => {
      console.log(searchKeyword);
      console.log(selected);
      if (selected === "opTitle")
        return post.COMMUNITY_TITLE.includes(searchKeyword);
      else return post.USER_NICKNAME.includes(searchKeyword);
    });
    console.log(filtered);
    setPosts(filtered);
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    setSearchKeyword(""); // 검색어 초기화
    setPosts(allPosts); // 상태 초기화
    console.log(selected);
  }, [selected]);
  useEffect(() => {
    // posts 상태가 바뀌면 필터링 실행
    setPaginatedPosts(filterPosts());
    console.log("솔팅 결과");
    console.log(paginatedPosts);
    console.log("--------");
    console.log(posts);
  }, [posts, pageNum]);

  return (
    <div className="CmContainer">
      <Wrapper>
        <Container01>상단 광고</Container01>
        <Input_Wrapper>
          <div className="search-select">
            <Select
              options={searchOptions}
              value={searchOptions.find((option) => option.value === selected)}
              onChange={(e) => setSelected(e.target.value)}
              defaultValue=""
            />
          </div>
          <Search_Box>
            <Input_Box>
              <Input
                type="text"
                placeholder="search"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </Input_Box>
            <Button onClick={searchHandler}>SEARCH</Button>
          </Search_Box>
        </Input_Wrapper>
        <Title>REVIEW</Title>
        <ul>
          {paginatedPosts.map((post) => {
            return <CmPost post={post} />;
          })}
        </ul>
        <Wrapper></Wrapper>
        <Button_Box>
          <Button
            onClick={() => {
              navigate("/CmAdd");
            }}
          >
            글쓰기
          </Button>
        </Button_Box>
        {/* ✅ 페이징 컴포넌트 추가 */}
        <PaginationComponent
          totalItems={posts.length}
          itemsPerPage={cnt}
          onPageChange={setPageNum}
        />
      </Wrapper>
    </div>
  );
};

export default CmMain;
