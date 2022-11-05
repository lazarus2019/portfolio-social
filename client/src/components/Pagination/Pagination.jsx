import classNames from "classnames/bind";
import styles from "./Pagination.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function Pagination(props) {
  const { onPageChange, totalPage, currentPage } = props;
  const handleClickPageChange = (page) => {
    if (!onPageChange) return;
    onPageChange(page);
  };

  return (
    <div className={cx("pagination")}>
      <button
        onClick={() => handleClickPageChange(currentPage - 1)}
        className={cx(
          "pagination__btn",
          `${currentPage <= 1 ? "disabled" : ""}`
        )}
      >
        <BsChevronLeft size={15} />
        Previous
      </button>
      <button
        onClick={() => handleClickPageChange(currentPage + 1)}
        className={cx(
          "pagination__btn",
          `${currentPage === totalPage ? "disabled" : ""}`
        )}
      >
        Next
        <BsChevronRight size={15} />
      </button>
    </div>
  );
}

Pagination.propTypes = {};

export default Pagination;
