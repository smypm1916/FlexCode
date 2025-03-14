import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { PaginationComponent } from "./PaginationComponent";
import Select from "../common/Select";
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
import {
  Container_Style,
  Wrapper,
  Input_Wrapper,
  Input_Box,
} from "../../style/Common_Style";
import TextInput from "../common/TextInput";
import CmAdd from "./CmAdd";
import Searchbox from "../common/Searchbox";
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

  const Navigate = useNavigate();

  return (
    <Wrapper className="cm" id="community">
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
          <Searchbox>
            <Search_Box>
              <Input_Box>
                <TextInput
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
          </Searchbox>
        </Input_Wrapper>

        {paginatedPosts.map((post) => {
          return <CmPost post={post} />;
        })}

        <ul>
          {paginatedPosts.map((post) => {
            return <CmPost post={post} />;
          })}
        </ul>
        <Input_Wrapper>
          <Button btnTxt={"글쓰기"} onClick={() => Navigate("/CmAdd")}>
            글쓰기
          </Button>
        </Input_Wrapper>
        {/* ✅ 페이징 컴포넌트 추가 */}
        <PaginationComponent
          totalItems={posts.length}
          itemsPerPage={cnt}
          onPageChange={setPageNum}
        />
      </Container_Style>
    </Wrapper>
  );
};

export default CmMain;
