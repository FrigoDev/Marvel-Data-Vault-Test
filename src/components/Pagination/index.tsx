import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

import "./Pagination.css";

const Pagination = ({
  firstPage,
  lastPage,
  currentPage,
  nextPage,
  prevPage,
  totalPages,
}: {
  firstPage: () => void;
  lastPage: () => void;
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  totalPages: number;
}) => {
  return (
    <div className="pagination-container">
      <ul className="pagination-ul">
        <li className="pagination-li">
          <button className="pagination-button" data-testid="first-page" onClick={firstPage}>
            <BiArrowToLeft />
          </button>
        </li>
        {currentPage >= 1 && (
          <li className="pagination-li">
            <button className="pagination-button" data-testid="prev-page" onClick={prevPage}>
              {currentPage}
            </button>
          </li>
        )}
        <li className="pagination-li">
          <button className="pagination-button pagination-active">
            {currentPage + 1}
          </button>
        </li>
        {currentPage < totalPages && (
          <li className="pagination-li">
            <button className="pagination-button" data-testid="next-page" onClick={nextPage}>
              {currentPage + 2}
            </button>
          </li>
        )}
        <li className="pagination-li">
          <button className="pagination-button" data-testid="last-page" onClick={lastPage}>
            <BiArrowToRight />
          </button>
        </li>
      </ul>
    </div>
  );
};
export default Pagination;
