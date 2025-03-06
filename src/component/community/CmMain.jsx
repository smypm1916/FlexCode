import { useState } from "react";
import { PaginationComponent } from "./PaginationComponent";
import Searchbox from "../common/Searchbox";
import Select from "../common/Select";

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

      <ul>
        {paginatedPosts.map((post) => (
          <li key={post.id} className="border p-2 mb-2">
            {post.profile} {post.title} {post.img} {post.user} {post.date}
          </li>
        ))}
      </ul>
      <button>글쓰기</button>
      {/* ✅ 페이징 컴포넌트 추가 */}
      <PaginationComponent
        totalItems={dummyPosts.length}
        itemsPerPage={cnt}
        onPageChange={setPageNum}
      />
    </div>
  );
};

export default CmMain;
