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
  let Comp = "button";
  const propsTemp = {};
  if (props.to) {
    Comp = Link;
    propsTemp.to = props.to;
  }
  const handleClick = () => {
    if (props.onClick) props.onClick();
  };
  return (
    <Comp
      className={cx("basic-button", props.className)}
      onClick={handleClick}
      {...propsTemp}
    >
      {props.content}
    </Comp>
  );
}

export default Button;
