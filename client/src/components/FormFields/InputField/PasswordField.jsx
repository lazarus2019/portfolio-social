import classNames from "classnames/bind";
import styles from "./InputField.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { useState } from "react";
import { BiShowAlt, BiHide } from "react-icons/bi";

function PasswordField(props) {
  const { label, value, onChange, onBlur, errors, className } = props;
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={cx("input-field__group", className)}>
      <label htmlFor="" className={cx("input-field__group__label")}>
        {label}
      </label>
      <div className={cx("password-input__box")}>
        <input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={showPassword ? "text" : "password"}
          className={cx("input-field__group__input")}
        />
        {showPassword ? (
          <BiShowAlt onClick={toggleShowPassword} size={20} />
        ) : (
          <BiHide onClick={toggleShowPassword} size={20} />
        )}
      </div>
      {errors && (
        <div className={cx("input-field__group__error")}>{errors}</div>
      )}
    </div>
  );
}

PasswordField.propTypes = {};

export default PasswordField;
