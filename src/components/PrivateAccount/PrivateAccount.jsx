import classNames from "classnames/bind";
import { useState } from "react";
import CheckBoxField from "../Forms/FormFields/CheckBoxField";
import styles from "./PrivateAccount.module.scss";

const cx = classNames.bind(styles);

function PrivateAccount(props) {
  const { isPrivate, onUpdate, loading } = props;
  const [isChecked, setChecked] = useState(isPrivate);
  const handleClickUpdate = () => {
    if (!onUpdate) return;
    onUpdate({ isPrivate: isChecked });
  };

  const handleChange = (e) => {
    setChecked(!isChecked);
  };
  return (
    <div>
      <p className={cx("p-note")}>
        When your account is private, no one could access or see your saved
        projects. More features will update later.
      </p>
      <CheckBoxField
        label="Private account"
        value={isChecked}
        id="checkbox_private"
        onChange={handleChange}
      />
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
