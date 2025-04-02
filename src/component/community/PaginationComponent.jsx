import { useState } from "react";
import {
  Button_After,
  Button_Before,
  Button_Pagination,
  Pagination_Wrapper,
} from "../../style/Community_Style";
export function PaginationComponent({
  totalItems,
  itemsPerPage,
  onPageChange,
}) {
  const [pageNum, setPageNum] = useState(1);
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (num) => {
    setPageNum(num);
    onPageChange(num); // 부모 컴포넌트에 현재 페이지 전달
  };

  return (
    <Pagination_Wrapper>
      <Button_Before
        onClick={() => handlePageChange(pageNum - 1)}
        disabled={pageNum === 1}
        className="border px-3 py-1"
      >
        Prev
      </Button_Before>

      {Array.from({ length: pageCount }, (_, i) => i + 1).map((num) => (
        <Button_Pagination
          key={num}
          onClick={() => handlePageChange(num)}
          className={`border px-3 py-1 ${
            num === pageNum ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          {num}
        </Button_Pagination>
      ))}

      <Button_After
        onClick={() => handlePageChange(pageNum + 1)}
        disabled={pageNum === pageCount}
        className="border px-3 py-1"
      >
        {" "}
        Next
      </Button_After>
    </Pagination_Wrapper>
  );
}
