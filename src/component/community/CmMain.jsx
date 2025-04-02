import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container_Style,
  Input_Box,
  Input_Wrapper,
  Wrapper,
} from "../../style/Common_Style";
import {
  Chat_icon,
  Container01,
  Search_Box,
} from "../../style/Community_Style";
import LoginModal from "../account/LoginModal";
import Button from "../common/Button";
import Select from "../common/Select";
import TextInput from "../common/TextInput";
import CmPost from "./CmPost";
import { PaginationComponent } from "./PaginationComponent";

const CmMain = () => {
  const navigate = useNavigate();
  const cnt = 6; // 한 페이지당 개수
  const [selected, setSelected] = useState("opTitle");
  const [pageNum, setPageNum] = useState(1);
  const [allPosts, setAllPosts] = useState([]); // 원본 데이터 저장
  const [posts, setPosts] = useState([]);
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [nickname, setNickname] = useState("");
  const imgPath = import.meta.env.VITE_IMG_PATH;
  const [showModal, setShowModal] = useState(false);
  const filterPosts = () => {
    if (posts.length === 0) return [];
    const start = posts.length - cnt * (pageNum - 1);
    12 / 3 ? -1 : 12 - 3;
    9;
    const end = pageNum === Math.ceil(posts.length / cnt) ? 0 : start - cnt;
    return posts.slice(end, start).reverse();
  };
  const getPosts = async () => {
    const response = await axios.get("http://localhost:8080/api/post/paging");
    setAllPosts(response.data); // 원본 데이터 저장
    console.log("받아온 데이터:", response.data);
    setPosts(response.data);
  };
  const searchOptions = [
    { value: "opTitle", label: "TITLE" },
    { value: "opUser", label: "WRITER" },
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

  const openChat = () => {
    const storedToken = sessionStorage.getItem("token");
    if (!storedToken) {
      alert("로그인이 필요합니다");
      setShowModal(true);
    } else {
      try {
        const decoded = jwtDecode(storedToken);
        setNickname(decoded.nickname);
        console.log("----=-=-=-=-=-=-=-=-=-=-=-=-=-");
        console.log(nickname);
        console.log("----=-=-=-=-=-=-=-=-=-=-=-=-=-");
        if (nickname !== "") {
          const url = `http://localhost:3000/chat?name=${nickname}&room=SelectNo`; // id를 포함한 URL 생성
          window.open(url, "_blank"); // 새 탭에서 열기
        }
      } catch (error) {
        console.error("커뮤 작성 토큰 디코딩 실패 :", error);
        sessionStorage.removeItem("token");
      }
    }
  };

  return (
    <Wrapper className="wrap marginTop bottomNone" id="community">
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
      <Container_Style>
        <Container01>Brand New Launch, We are GENDERLESS</Container01>
      </Container_Style>
      <Container_Style>
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
        </Input_Wrapper>
        <Chat_icon onClick={openChat}>
          <img src={`${imgPath}/Chat_icon.png`} />
        </Chat_icon>
        <Container_Style className="CmPost">
          {posts.length > 0 ? (
            paginatedPosts.map((post) => (
              <CmPost key={post.COMMUNITY_NO} post={post} />
            ))
          ) : (
            <h2>投稿が見つかりません</h2>
          )}
        </Container_Style>
        <Input_Wrapper>
          <Button btnTxt={"Write"} onClick={() => navigate("/CmAdd")}></Button>
        </Input_Wrapper>
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
