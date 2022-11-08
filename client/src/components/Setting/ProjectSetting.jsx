import classNames from "classnames/bind";
import styles from "./Setting.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";

function ProjectSetting(props) {
  return (
    <div className={cx("setting-container")}>
      <h2 className={cx("setting__header")}>Project Setting</h2>
      <h3>In process</h3>
    </div>
  );
}

ProjectSetting.propTypes = {};

export default ProjectSetting;
