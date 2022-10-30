import classNames from "classnames/bind";
import styles from "./Empty.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import assets from "@/assets";

function Empty(props) {
  const { desc = "This section is empty!", className } = props;
  return (
    <div className={cx("empty-container", className)}>
      <p className={cx("empty-container__header")}>{desc}</p>
      <div className={cx("empty-container__img")}>
        <img src={assets.images.empty} alt="" />
      </div>
    </div>
  );
}

Empty.propTypes = {};

export default Empty;
