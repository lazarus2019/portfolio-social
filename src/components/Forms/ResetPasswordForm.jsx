import classNames from "classnames/bind";
import { useFormik } from "formik";
import * as yup from "yup";
import PasswordField from "./FormFields/PasswordField";
import styles from "./Forms.module.scss";

const cx = classNames.bind(styles);

const formSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must at least 6 characters"),
  retypePassword: yup
    .string()
    .required("Please retype your password")
    .oneOf([yup.ref("password")], "Password does not match"),
});

function ResetPasswordForm(props) {
  const { onSubmit, loading } = props;

  const formik = useFormik({
    initialValues: {
      password: "",
      retypePassword: "",
    },
    onSubmit: (values) => {
      if (!onSubmit) return;
      delete values?.retypePassword;
      onSubmit(values);
    },
    validationSchema: formSchema,
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <PasswordField
          label="New Password"
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          errors={formik.touched.password && formik.errors.password}
        />
        <PasswordField
          label="Retype password"
          value={formik.values.retypePassword}
          onChange={formik.handleChange("retypePassword")}
          onBlur={formik.handleBlur("retypePassword")}
          errors={formik.touched.retypePassword && formik.errors.retypePassword}
        />

        <div className={cx("form__bottom")}>
          {loading ? (
            <button
              type="submit"
              className={cx(
                "form__bottom__submit-btn",
                "fullWidth",
                "disabled-btn"
              )}
            >
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className={cx("form__bottom__submit-btn", "fullWidth")}
            >
              Reset password
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

ResetPasswordForm.propTypes = {};

export default ResetPasswordForm;
