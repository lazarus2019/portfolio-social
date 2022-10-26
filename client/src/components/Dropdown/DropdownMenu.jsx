import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./DropdownMenu.module.scss";
import DropdownItem from "./DropdownItem";
const cx = classNames.bind(styles);

function DropdownMenu(props) {
  return (
    <div className={cx("dropdown-container", props.className)}>
      {props.items.map((menuItem, index) => (
          <DropdownItem item={menuItem} key={index} />
      ))}
    </div>
  );
}

DropdownMenu.propTypes = {};

export default DropdownMenu;
