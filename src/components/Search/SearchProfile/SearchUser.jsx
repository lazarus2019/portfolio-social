import classNames from "classnames/bind";
import { useDebounce } from "hooks";
import { useEffect, useMemo, useState } from "react";
import styles from "./SearchProfile.module.scss";
const cx = classNames.bind(styles);

function SearchUser(props) {
  const { onSearchChange, params } = props;
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
        placeholder="Find a user"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}

SearchUser.propTypes = {};

export default SearchUser;
