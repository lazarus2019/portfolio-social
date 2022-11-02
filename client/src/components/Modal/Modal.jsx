import classnames from "classnames/bind";
import styles from "./Modal.module.scss";

const cx = classnames.bind(styles);
import PropTypes from "prop-types";

function Modal(props) {
  const { children, ...rest } = props;
  return (
    <div className={cx("modal-container")} {...rest}>
      <div className={cx("modal-container__body")}>{children}</div>
    </div>
  );
}

Modal.propTypes = {};

export default Modal;
