import classNames from "classnames/bind";
import styles from "./Button.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";

function Button(props) {
  const handleClick = () => {
    if (props.onClick) onClick();
  };
  return (
    <button className={cx("button", props.className)} onClick={handleClick}>
      {props.content}
    </button>
  );
}

Button.propTypes = {
  content: PropTypes.string.isRequired,
};

export function BasicButton(props) {
  const handleClick = () => {
    if (props.onClick) onClick();
  };
  return (
    <button
      className={cx("basic-button", props.className)}
      onClick={handleClick}
    >
      {props.content}
    </button>
  );
}

export default Button;
