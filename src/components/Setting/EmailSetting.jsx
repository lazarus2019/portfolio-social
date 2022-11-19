import classNames from "classnames/bind";
import styles from "./Setting.module.scss";

const cx = classNames.bind(styles);

function EmailSetting(props) {
  return (
    <div className={cx("setting-container")}>
      <h2 className={cx("setting__header")}>Email Setting</h2>
      <h3>In process</h3>
    </div>
  );
}

EmailSetting.propTypes = {};

export default EmailSetting;
