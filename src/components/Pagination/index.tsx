import React from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  count: number;
  size: number;
  movePage: (page: number) => void;
}

function Pagination(props: PaginationProps) {
  const firstDisabled = props.page === 1;
  const nextDisabled = props.page === Math.ceil(props.count / props.size);

  const showButton =
    Math.ceil(props.count / props.size) === 1
      ? [1]
      : Math.ceil(props.count / props.size) === 2
      ? [1, 2]
      : Math.ceil(props.count / props.size) === 3 || props.page === 1
      ? [1, 2, 3]
      : props.page === Math.ceil(props.count / props.size)
      ? [props.page - 2, props.page - 1, props.page]
      : [props.page - 1, props.page, props.page + 1];

  return (
    <div className="pagination-div flex mobile:scale-75">
      <button
        className={`${styles.firstBtn} text-primary ${
          firstDisabled ? "bg-[#b4b4b4]" : ""
        }`}
        onClick={() => props.movePage(1)}
        disabled={firstDisabled}
      >
        First
      </button>
      {showButton.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => props.movePage(pageNum)}
          className={`${styles.pageBtn} ${
            pageNum === props.page
              ? "bg-amber-400 text-orange-600"
              : "bg-white text-primary"
          }`}
        >
          {pageNum}
        </button>
      ))}
      <button
        className={`${styles.nextBtn} text-primary ${
          nextDisabled ? "bg-[#b4b4b4]" : ""
        }`}
        onClick={() => props.movePage(props.page + 1)}
        disabled={nextDisabled}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
