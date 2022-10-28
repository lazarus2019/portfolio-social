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
  } = props;
  return (
    <div className={cx("input-field__group", className)}>
      <label htmlFor="" className={cx("input-field__group__label")}>
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        className={cx("input-field__group__input")}
      />
      {errors && (
        <div className={cx("input-field__group__error")}>{errors}</div>
      )}
    </div>
  );
}

InputField.propTypes = {};

export default InputField;
