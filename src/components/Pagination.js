import React, { useState, useEffect, Fragment } from "react";
import "../style/pagination.scss";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";
const FIRST_PAGE = "FIRST";
const LAST_PAGE = "LAST";

const range = (from, to, step = 1) => {
  let i = from;
  const ranges = [];
  while (i <= to) {
    ranges.push(i);
    i += step;
  }
  return ranges;
};

const Pagination = (props) => {
  const { totalRecords: records, pageLimit, pageNumber } = props;
  const totalPages = Math.ceil(records / pageLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(records);

  useEffect(() => {
    if (pageNumber > 0) {
      setCurrentPage(pageNumber);
    }
  }, [pageNumber]);

  const gotoPage = async (page) => {
    const { onPageChanged } = props;
    const currentPage = Math.max(0, Math.min(page, totalPages));
    await setCurrentPage(currentPage);
    await onPageChanged(currentPage);
  };

  const handleClick = (e, page) => {
    e.preventDefault();
    gotoPage(page);
  };

  const handleLeft = (e) => {
    e.preventDefault();
    this.gotoPage(currentPage - 1);
  };

  const handleRight = (e) => {
    e.preventDefault();
    this.gotoPage(currentPage + 1);
  };

  const fetchPages = () => {
    const { pageNeighbours } = props;
    const totalNumbers = pageNeighbours + 2;
    const totalBlocks = totalNumbers + 2;
    if (totalPages > totalBlocks) {
      const startPage = Math.max(1, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);
      const hasLeftSpill = startPage > 1;
      const hasRightSpill = totalPages - endPage > 0;
      const spillOffset = totalNumbers - (pages.length + 1);
      if (hasLeftSpill && !hasRightSpill) {
        const extraPages = range(startPage - spillOffset, startPage - 1);
        pages = [FIRST_PAGE, LEFT_PAGE, ...extraPages, ...pages];
      } else if (!hasLeftSpill && hasRightSpill) {
        const extraPages = range(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, RIGHT_PAGE, LAST_PAGE];
      } else if (hasLeftSpill && hasRightSpill) {
        pages = [FIRST_PAGE, LEFT_PAGE, ...pages, RIGHT_PAGE, LAST_PAGE];
      }
      return [...pages];
    }
    return range(1, totalPages);
  };

  const { hrClass, containerMargin } = props;
  const pages = fetchPages();

  if (!totalRecords || totalPages === 1) return null;
  return (
    <Fragment>
      <hr className={hrClass} />
      <div style={{ margin: containerMargin }} className="common-pagination">
        <span className="subtitle">
          Showing {(currentPage - 1) * pageLimit + 1} -{" "}
          {currentPage * pageLimit > totalRecords
            ? totalRecords
            : currentPage * pageLimit}{" "}
          of total {totalRecords} results
        </span>
        <ul className="page-list">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE) {
              return (
                <li key={index} className="page-btn" onClick={handleLeft}>
                  <span className="page-icon icon-sleftarrow" />
                </li>
              );
            }
            if (page === RIGHT_PAGE) {
              return (
                <li key={index} className="page-btn" onClick={handleRight}>
                  <span className="page-icon icon-srightarrow" />
                </li>
              );
            }
            if (page === FIRST_PAGE) {
              return (
                <li
                  key={index}
                  className="page-btn start"
                  onClick={(e) => handleClick(e, 1)}
                >
                  <span>First</span>
                </li>
              );
            }
            if (page === LAST_PAGE) {
              return (
                <li
                  key={index}
                  className="page-btn end"
                  onClick={(e) => handleClick(e, totalPages)}
                >
                  <span>Last</span>
                </li>
              );
            }
            return (
              <li
                key={index}
                className={`page-btn${currentPage === page ? " selected" : ""}`}
                onClick={(e) => handleClick(e, page)}
              >
                <span>{page}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default Pagination;
