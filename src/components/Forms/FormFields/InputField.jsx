import classNames from "classnames/bind";
import styles from "./InputField.module.scss";

const cx = classNames.bind(styles);

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
    readOnly,
  } = props;
  return (
    <div
      className={cx(
        "input-field__group",
        className,
        `${halfWidth ? "halfWidth" : ""}`
      )}
    >
      {label ? (
        <label htmlFor="" className={cx("input-field__group__label")}>
          {label}
        </label>
      ) : null}
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        className={cx(
          "input-field__group__input",
          `${noOutline && "noOutline"}`,
          `${readOnly && "readOnly"}`
        )}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      {errors && (
        <div className={cx("input-field__group__error")}>{errors}</div>
      )}
    </div>
  );
}

InputField.propTypes = {};

export default InputField;
