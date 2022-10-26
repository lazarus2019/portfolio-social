import classNames from "classnames/bind";
import styles from "./PopularSection.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const tabs = [
  {
    title: "Projects",
    path: "project",
  },
  {
    title: "Users",
    path: "user",
  }
];

function PopularTab({ currentTab }) {
  return (
    <div className={cx("popular-tabs")}>
      {tabs.map((tab, index) => (
        <NavLink
          to={`/?tab=${tab.path}`}
          key={index}
          className={cx(
            "popular-tabs__item",
            `${currentTab === tab.path && "active"}`
          )}
        >
          {tab.title}
        </NavLink>
      ))}
    </div>
  );
}

PopularTab.propTypes = {};

export default PopularTab;
