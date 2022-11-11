import classNames from "classnames/bind";
import styles from "./Loading.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { ScaleLoader } from "react-spinners";

function Loading({
  vertical = "center",
  horizontal = "center",
  fullHeight = false,
  color = "#000",
}) {
  return (
    <div
      className={cx(
        "loading-container",
        "flex",
        `${fullHeight && "fullHeight"}`
      )}
      dataposition={`${vertical}-${horizontal}`}
    >
      <ScaleLoader color={color} />
    </div>
  );
}

Loading.propTypes = {};

export default Loading;
