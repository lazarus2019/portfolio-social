import classNames from "classnames/bind";
import {
  BsCheckLg,
  BsEmojiSunglasses,
  BsFillBarChartFill,
  BsFillFolderFill,
  BsFillLaptopFill,
} from "react-icons/bs";
import styles from "./RouteSection.module.scss";

const cx = classNames.bind(styles);

const routes = [
  {
    icon: <BsCheckLg size={25} />,
    title: "Sign Up",
  },
  {
    icon: <BsFillLaptopFill size={25} />,
    title: "Create Project",
  },
  {
    icon: <BsFillFolderFill size={25} />,
    title: "Collect Project",
  },
  {
    icon: <BsFillBarChartFill size={25} />,
    title: "Planning",
  },
  {
    icon: <BsEmojiSunglasses size={25} />,
    title: "Make It Better",
  },
];

function RouteSection(props) {
  return (
    <div className={cx("section", "container", "route-container")}>
      <div className={cx("route-header")}>
        Automate anything with
        <div className={cx("route-gradient", "gradient")}>GitHub Actions</div>
      </div>
      <div className={cx("route-list")}>
        <div className={cx("timeline")}></div>
        {routes.map((route, index) => (
          <div className={cx("route-item")} key={index}>
            <div className={cx("route-item__no")}>0{index + 1}</div>
            <div className={cx("route-item__icon")}>{route.icon}</div>
            <div className={cx("route-item__title")}>{route.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

RouteSection.propTypes = {};

export default RouteSection;
