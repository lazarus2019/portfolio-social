import classNames from "classnames/bind";
import styles from "./InputField.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";

function InputField(props) {
  const {
    label,
    type = "text",
    value,
    onChange,
    onBlur,
    errors,
    className,
    halfWidth,
    noOutline,
    placeholder = "",
  } = props;
  return (
    <div
      className={cx(
        "input-field__group",
        className,
        `${halfWidth ? "halfWidth" : ""}`
      )}
    >
      <label htmlFor="" className={cx("input-field__group__label")}>
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        className={cx(
          "input-field__group__input",
          `${noOutline && "noOutline"}`
        )}
        placeholder={placeholder}
      />
      {errors && (
        <div className={cx("input-field__group__error")}>{errors}</div>
      )}
    </div>
  );
}

InputField.propTypes = {};

export default InputField;
