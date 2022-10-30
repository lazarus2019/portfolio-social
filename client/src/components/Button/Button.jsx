import classNames from "classnames/bind";
import styles from "./Button.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Button(props) {
  const { to, className } = props;
  let Comp = "button";
  const propsTemp = {};
  if (to) {
    Comp = Link;
    propsTemp.to = to;
  }
  const classes = cx("button", {
    [className]: props.className,
  });
  const handleClick = () => {
    if (props.onClick) onClick();
  };
  return (
    <Comp className={classes} onClick={handleClick} {...propsTemp}>
      {props.content}
    </Comp>
  );
}

Button.propTypes = {
  content: PropTypes.string.isRequired,
};

export function BasicButton(props) {
  const handleClick = () => {
    if (props.onClick) props.onClick();
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
