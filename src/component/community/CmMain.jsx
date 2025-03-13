import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { PaginationComponent } from "./PaginationComponent";
import Select from "../common/Select";
import styled from "styled-components";
import {
  Pagination_List,
  Search_Box,
  Container01,
} from "../../style/Community_Style";
import Button from "../common/Button";
import {
  List_Column,
  List_Content,
  List_Profile,
  Profile_Img,
} from "../../style/List_Style";
import { Container_Style, Wrapper } from "../../style/Common_Style";

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

const CmMain = () => {
  const navigate = useNavigate();
  const cnt = 6; // 한 페이지당 개수
  const [selected, setSelected] = useState("");
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

    const filtered = allPosts.filter((post) =>
      post.COMMUNITY_TITLE.includes(searchKeyword)
    );

    setPosts(filtered);
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    // posts 상태가 바뀌면 필터링 실행
    setPaginatedPosts(filterPosts());
    console.log("솔팅 결과");
    console.log(paginatedPosts);
    console.log("--------");
    console.log(posts);
  }, [posts, pageNum]);

  return (
    <Wrapper>
      <Container_Style>
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
            <Button onClick={searchHandler} btnTxt={"SEARCH"}>
              SEARCH
            </Button>
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
        <Input_Wrapper>
          <Button btnTxt={"글쓰기"}>글쓰기</Button>
        </Input_Wrapper>
        {/* ✅ 페이징 컴포넌트 추가 */}
        {/* <PaginationComponent
          totalItems={dummyPosts.length}
          itemsPerPage={cnt}
          onPageChange={setPageNum}
        /> */}
      </Container_Style>
    </Wrapper>
  );
};

export default CmMain;
