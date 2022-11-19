import classNames from "classnames/bind";
import DropdownItem from "./DropdownItem";
import styles from "./DropdownMenu.module.scss";
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
