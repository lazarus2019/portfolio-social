import classNames from "classnames/bind";
import styles from "./SearchProfile.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { BsFillCaretDownFill, BsX, BsCheck } from "react-icons/bs";

const filters = [
  {
    title: "Type",
    name: "type",
    desc: "Select type",
    options: [
      {
        title: "All",
        value: "all",
      },
      {
        title: "Public",
        value: "public",
      },
      {
        title: "Private",
        value: "private",
      },
    ],
  },
  {
    title: "Sort",
    name: "sort",
    desc: "Select order",
    options: [
      {
        title: "Last updated",
        value: "date",
      },
      {
        title: "Name",
        value: "name",
      },
      {
        title: "Stars",
        value: "stars",
      },
    ],
  },
];

function SearchProject({ isCurrentUser }) {
  return (
    <div className={cx("profile-search")}>
      <input
        type="text"
        className={cx("profile-search__input")}
        placeholder="Find a project"
      />

      <div className="profile-search__filters">
        {filters.map((filter, index) => (
          <button className={cx("profile-search__btn")} key={index}>
            {filter.title}{" "}
            <BsFillCaretDownFill
              size={10}
              className={cx("profile-search__btn__icon")}
            />
            <div className={cx("dropdown-menu")}>
              <div className={cx("dropdown-menu__header")}>{filter.desc}</div>
              <div className={cx("dropdown-menu__list")}>
                {filter.options.map((option, index) => (
                  <label
                    key={index}
                    htmlFor={option.title + "_" + index}
                    className={cx("dropdown-menu__list__item")}
                  >
                    <input
                      value={option.value}
                      type="radio"
                      name={filter.name}
                      id={option.title + "_" + index}
                      defaultChecked={index === 0}
                    />
                    <BsCheck size={20} />
                    {option.title}
                  </label>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {isCurrentUser ? (
        <button className={cx("profile-search__btn", "primary")}>New</button>
      ) : null}
    </div>
  );
}

SearchProject.propTypes = {};

export default SearchProject;
