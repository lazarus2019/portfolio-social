import classNames from "classnames/bind";
import styles from "./Pagination.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function Pagination(props) {
  return (
    <div className={cx("pagination")}>
      <button className={cx("pagination__btn", "disabled")}>
        <BsChevronLeft size={15} />
        Previous
      </button>
      <button className={cx("pagination__btn")}>
        Next
        <BsChevronRight size={15} />
      </button>
    </div>
  );
}

Pagination.propTypes = {};

export default Pagination;
