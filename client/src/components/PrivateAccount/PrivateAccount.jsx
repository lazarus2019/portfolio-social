import classNames from "classnames/bind";
import styles from "./PrivateAccount.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";

function PrivateAccount(props) {
  const { isPrivate, onUpdate, loading } = props;
  const handleClickUpdate = () => {
    if (!onUpdate) return;
    onUpdate();
  };
  return (
    <div>
      <p className={cx("p-note")}>
        When your account is private, no one could access or see your saved
        projects. More features will update later.
      </p>
      <button
        className={cx(
          "submit-btn",
          "m-15",
          "redirect",
          `${loading && "disabled-btn"}`
        )}
        onClick={handleClickUpdate}
      >
        {loading ? "Loading..." : "Update"}
      </button>
    </div>
  );
}

PrivateAccount.propTypes = {};

export default PrivateAccount;
