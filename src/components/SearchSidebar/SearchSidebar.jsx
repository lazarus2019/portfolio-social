import classNames from "classnames/bind";
import styles from "./SearchSidebar.module.scss";

const cx = classNames.bind(styles);

function SearchSidebar(props) {
  const { result, tab } = props;
  const { projectCount, userCount, tagCount } = result;
  return (
    <div className={cx("search-sidebar")}>
      <div className={cx("search-sidebar__filter")}>
        <div className={cx("search-sidebar__filter__item", "active")}>
          Projects
          <span className={cx("search-sidebar__filter__item__amount")}>
            {projectCount}
          </span>
        </div>
        <div className={cx("search-sidebar__filter__item")}>
          Users
          <span className={cx("search-sidebar__filter__item__amount")}>
            {userCount}
          </span>
        </div>
        <div className={cx("search-sidebar__filter__item")}>
          Tags
          <span className={cx("search-sidebar__filter__item__amount")}>
            {tagCount}
          </span>
        </div>
        <div className={cx("search-sidebar__filter__item")}>
          Languages
          <span className={cx("search-sidebar__filter__item__amount")}>0</span>
        </div>
        <div className={cx("search-sidebar__filter__item")}>
          Others
          <span className={cx("search-sidebar__filter__item__amount")}>10</span>
        </div>
      </div>
    </div>
  );
}

SearchSidebar.propTypes = {};

export default SearchSidebar;
