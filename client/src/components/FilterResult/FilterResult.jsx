import { BsFillXSquareFill } from "react-icons/bs";
import classNames from "classnames/bind";
import styles from "./FilterResult.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function FilterResult(props) {
  const { onClearFilter, params } = props;
  const [isShow, setShow] = useState(false);

  const handleClickClear = () => {
    if (!onClearFilter) return;
    onClearFilter();
  };

  useEffect(() => {
    const temp = { ...params };
    delete temp?.tab;
    delete temp?.page;

    const show = Object.values(temp).some((value) => value !== undefined);
    setShow(show);
  }, [params]);

  return (
    <>
      {isShow ? (
        <div className={cx("filter", "flex", "space-between")}>
          <p className={cx("filter__results")}>
            <strong>0</strong> results for repositories matching{" "}
            <strong>d</strong> sorted by <strong>name</strong>
          </p>
          <div
            className={cx("filter__clear-btn", "flex", "y-center")}
            onClick={handleClickClear}
          >
            <BsFillXSquareFill size={18} />
            Clear filter
          </div>
        </div>
      ) : null}
    </>
  );
}

FilterResult.propTypes = {};

export default FilterResult;
