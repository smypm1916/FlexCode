import { useState } from "react";

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
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => handlePageChange(pageNum - 1)}
        disabled={pageNum === 1}
        className="border px-3 py-1"
      >
        이전
      </button>

      {Array.from({ length: pageCount }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => handlePageChange(num)}
          className={`border px-3 py-1 ${
            num === pageNum ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(pageNum + 1)}
        disabled={pageNum === pageCount}
        className="border px-3 py-1"
      >
        다음
      </button>
    </div>
  );
}
