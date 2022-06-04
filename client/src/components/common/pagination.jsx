import React from "react";
import PropTypes from "prop-types";
import lodash from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  console.log(currentPage);
  // if only one page, then don't render an page number
  if (pagesCount === 1) return null;
  const pages = lodash.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              className="page-link"
              onClick={() => onPageChange(page)}
              style={{ cursor: "pointer" }}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// This will check for invalid values props
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
