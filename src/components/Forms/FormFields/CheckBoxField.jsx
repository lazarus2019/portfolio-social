import classNames from "classnames/bind";
import styles from "./InputField.module.scss";

const cx = classNames.bind(styles);

function CheckBoxField(props) {
  const {
    label,
    value = false,
    className,
    onChange,
    onBlur,
    errors,
    id,
  } = props;

  return (
    <div className={cx("checkbox-field__group", className)}>
      <label htmlFor={id} className={cx("checkbox-field__group__label")}>
        {label}
        <input
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type="checkbox"
          className={cx("checkbox-field__group__label__input")}
          defaultChecked={value}
        />
        <span className={cx("checkbox-field__group__label__checkmark")}></span>
      </label>
      {errors && (
        <div className={cx("input-field__group__error")}>{errors}</div>
      )}
    </div>
  );
}

CheckBoxField.propTypes = {};

export default CheckBoxField;
