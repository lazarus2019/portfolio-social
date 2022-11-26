import classNames from "classnames/bind";
import { useMemo } from "react";
import { BsCheck, BsFillCaretDownFill } from "react-icons/bs";
import styles from "./SearchResult.module.scss";

const cx = classNames.bind(styles);

const sorts = {
  project: [
    {
      title: "Recent",
      value: "recent",
    },
    {
      title: "Name",
      value: "name",
    },
    {
      title: "Stars",
      value: "star",
    },
  ],
  user: [
    {
      title: "Name",
      value: "name",
    },
    {
      title: "Most projects",
      value: "m_project",
    },
    {
      title: "Fewest projects",
      value: "f_project",
    },
    {
      title: "Most followers",
      value: "m_follower",
    },
    {
      title: "Fewest followers",
      value: "f_follower",
    },
  ],
  tag: [
    {
      title: "Name",
      value: "name",
    },
  ],
  language: [
    {
      title: "Name",
      value: "name",
    },
  ],
  other: [
    {
      title: "Name",
      value: "name",
    },
  ],
};

function SearchResultHeader(props) {
  const { resultAmount = 0, tab = "project", onSortChange = () => {} } = props;
  return (
    <div className={cx("search-result__header")}>
      <div className="flex space-between">
        <div className={cx("search-result__header__heading")}>
          {resultAmount} {tab}s results
        </div>
        <SearchResultSort tab={tab} onChange={onSortChange} />
      </div>
      <div className="py-10">
        <div className="separate"></div>
      </div>
    </div>
  );
}

function SearchResultSort(props) {
  const { tab, onChange } = props;

  const listSort = useMemo(() => {
    return sorts[tab];
  }, [tab]);

  const handleChange = (e) => {
    if (!onChange) return;
    onChange({
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={cx("filter-sort__btn")}>
      Sorting
      <BsFillCaretDownFill size={10} className={cx("filter-sort__btn__icon")} />
      <div className={cx("dropdown-menu")}>
        <div className={cx("dropdown-menu__list")}>
          {listSort.map((option, index) => (
            <label
              key={index}
              htmlFor={option.title + "_" + index}
              className={cx("dropdown-menu__list__item")}
            >
              <input
                value={option.value}
                type="radio"
                name={tab}
                id={option.title + "_" + index}
                defaultChecked={index === 0}
                onChange={handleChange}
              />
              <BsCheck size={20} />
              {option.title}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

SearchResultHeader.propTypes = {};

export default SearchResultHeader;
