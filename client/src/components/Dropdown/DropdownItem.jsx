import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./DropdownMenu.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function DropdownItem({ item }) {
  return (
    <Link to={item.url} className={cx("dropdown-item")}>
      <div className={cx("dropdown-item__icon")}>{item.icon}</div>
      <div className={cx("dropdown-item__content")}>
        <p className={cx("dropdown-item__content__header")}>{item.title}</p>
        <span className={cx("dropdown-item__content__desc")}>{item.desc}</span>
      </div>
    </Link>
  );
}

DropdownItem.propTypes = {};

export default DropdownItem;
