import classNames from "classnames/bind";
import styles from "./SearchProfile.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { BsFillCaretDownFill, BsCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDebounce } from "@/hooks";
import { useEffect, useMemo, useState } from "react";

const filters = [
  {
    title: "Type",
    name: "type",
    desc: "Select type",
    isPermission: false,
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
    isPermission: true,
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

function SearchProject(props) {
  const {
    isCurrentUser = false,
    onFilterChange,
    onSearchChange,
    params,
  } = props;
  const value = useMemo(() => {
    return params?.q ? params?.q : undefined;
  });
  const [searchValue, setSearchValue] = useState(value);
  const debounceValue = useDebounce(searchValue, 500);

  useEffect(() => {
    // if (debounceValue !== "") {
    if (!onSearchChange) return;
    onSearchChange(debounceValue);
    // }
  }, [debounceValue]);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  return (
    <div className={cx("profile-search")}>
      <input
        type="text"
        value={searchValue ? searchValue : ""}
        className={cx("profile-search__input")}
        placeholder="Find a project"
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <div className="profile-search__filters">
        {filters.map((filter, index) => (
          <>
            {!isCurrentUser ? (
              filter.isPermission ? (
                <DropDownMenu
                  key={index}
                  filter={filter}
                  onChange={onFilterChange}
                />
              ) : null
            ) : (
              <DropDownMenu
                key={index}
                filter={filter}
                onChange={onFilterChange}
              />
            )}
          </>
        ))}
      </div>

      {isCurrentUser ? (
        <Link
          to="/create-project"
          className={cx("profile-search__btn", "primary")}
        >
          New
        </Link>
      ) : null}
    </div>
  );
}

const DropDownMenu = (props) => {
  const { filter, onChange } = props;
  const handleChange = (e) => {
    if (!onChange) return;
    onChange({
      [e.target.name]: e.target.value,
    });
  };
  return (
    <button className={cx("profile-search__btn")}>
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
                onChange={handleChange}
              />
              <BsCheck size={20} />
              {option.title}
            </label>
          ))}
        </div>
      </div>
    </button>
  );
};

SearchProject.propTypes = {};

export default SearchProject;
