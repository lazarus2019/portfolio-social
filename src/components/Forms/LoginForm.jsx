import classNames from "classnames/bind";
import InputField from "components/Forms/FormFields/InputField";
import PasswordField from "components/Forms/FormFields/PasswordField";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import styles from "./Forms.module.scss";

const cx = classNames.bind(styles);

const formSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(2, "Username must be at least 2 characters")
    .test(
      "Username not allow space and must be lowercase",
      "Username not allow space and must be lowercase",
      (value) => {
        if (value) {
          return /^[a-z]{2,}\S+$/.test(value);
        }
      }
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must at least 6 characters"),
});

function LoginForm(props) {
  const { onSubmit, loading } = props;
  // formik
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      if (!onSubmit) return;

      onSubmit(values);
    },
    validationSchema: formSchema,
  });
  return (
    <div className={cx("form")}>
      <div className={cx("form__header")}>Sign in to Portfolio Social</div>

      <form onSubmit={formik.handleSubmit}>
        <InputField
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange("username")}
          onBlur={formik.handleBlur("username")}
          errors={formik.touched.username && formik.errors.username}
        />
        <PasswordField
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          errors={formik.touched.password && formik.errors.password}
        />

        <div className={cx("form__bottom", "flex", "space-between")}>
          <Link to="/forgot-password">Forgot Password?</Link>

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
            <button type="submit" className={cx("form__bottom__submit-btn")}>
              Login
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

LoginForm.propTypes = {};

export default LoginForm;
