import classNames from "classnames/bind";
import InputField from "components/Forms/FormFields/InputField";
import PasswordField from "components/Forms/FormFields/PasswordField";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./Forms.module.scss";


const cx = classNames.bind(styles);

const formSchema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .test(
      "Full name must be at least 2 words",
      "Please enter a real name (ex: Tobias Fate)",
      (value) => {
        if (value) {
          return /^[a-zA-Z]{2,}(?: [a-zA-Z]{2,})$/.test(value);
        }
      }
    ),
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
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must at least 6 characters"),
  retypePassword: yup
    .string()
    .required("Please retype your password")
    .oneOf([yup.ref("password")], "Password does not match"),
});

function RegisterForm(props) {
  const { onSubmit, loading, userEmail } = props;

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: userEmail || "",
      password: "",
      retypePassword: "",
    },
    onSubmit: (values) => {
      if (!onSubmit) return;
      onSubmit(values);
    },
    validationSchema: formSchema,
  });
  return (
    <div className={cx("form")}>
      <div className={cx("form__header")}>Sign up to Portfolio Social</div>
      <form onSubmit={formik.handleSubmit}>
        <InputField
          label="Full name"
          value={formik.values.fullName}
          onChange={formik.handleChange("fullName")}
          onBlur={formik.handleBlur("fullName")}
          errors={formik.touched.fullName && formik.errors.fullName}
        />
        <InputField
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange("username")}
          onBlur={formik.handleBlur("username")}
          errors={formik.touched.username && formik.errors.username}
        />
        <InputField
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          errors={formik.touched.email && formik.errors.email}
        />
        <PasswordField
          label="Password"
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

        <div className={cx("form__bottom", "flex", "space-between")}>
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
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {};

export default RegisterForm;
