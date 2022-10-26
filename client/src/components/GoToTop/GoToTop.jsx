import classNames from "classnames/bind";
import styles from "./GoToTop.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { BsArrowBarUp } from "react-icons/bs";
import { useEffect, useRef } from "react";

function GoToTop(props) {
  const goTopRef = useRef(null);

  useEffect(() => {
    const shrinkGoTop = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        goTopRef.current.classList.add(cx("shrink"));
      } else {
        goTopRef.current.classList.remove(cx("shrink"));
      }
    };

    window.addEventListener("scroll", shrinkGoTop);

    return () => {
      window.removeEventListener("scroll", shrinkGoTop);
    };
  }, []);

  const goTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={cx("gotop")} onClick={goTop} ref={goTopRef}>
      <BsArrowBarUp size={20} />
    </div>
  );
}

GoToTop.propTypes = {};

export default GoToTop;
