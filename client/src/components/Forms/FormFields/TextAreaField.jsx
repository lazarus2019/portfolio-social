import classNames from "classnames/bind";
import styles from "./InputField.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";

function TextareaField(props) {
  const { label, value, onChange, onBlur, errors, className } = props;
  return (
    <div className={cx("input-field__group", className)}>
      <label htmlFor="" className={cx("input-field__group__label")}>
        {label}
      </label>
      <textarea
        onChange={onChange}
        onBlur={onBlur}
        className={cx("input-field__group__textarea")}
        defaultValue={value}
      ></textarea>
      {errors && (
        <div className={cx("input-field__group__error")}>{errors}</div>
      )}
    </div>
  );
}

TextareaField.propTypes = {};

export default TextareaField;
