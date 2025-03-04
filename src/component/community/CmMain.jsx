import { useState } from "react";
import { PaginationComponent } from "./PaginationComponent";
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
    <div className="cm-container">
      <div className="cm-top-ad">상단 광고</div>
      <div className="cm-search">
        <div className="search-select">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="opTitle">제목</option>
            <option value="opUser">작성자</option>
          </select>
        </div>
        <div className="search-input">
          <input type="text" placeholder="search" />
        </div>
        <button>SEARCH</button>
      </div>
      <div className="cm-info">상품 리뷰</div>

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
