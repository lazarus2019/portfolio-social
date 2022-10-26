import classNames from "classnames/bind";
import styles from "./Login.module.scss";

import assets from "@/assets";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { useFormik } from "formik";
import * as yup from "yup";
import queryString from "query-string";
import InputField from "@/components/FormFields/InputField/InputField";
import Grid from "@/components/Grid/Grid";
import PasswordField from "@/components/FormFields/InputField/PasswordField";

const formSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  username: yup.string().required("Username is required"),
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

function Register(props) {
  const location = useLocation();
  const { user_email } = queryString.parse(location.search);
  // formik
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: user_email || "",
      password: "",
      retypePassword: "",
    },
    onSubmit: (value) => {},
    validationSchema: formSchema,
  });
  return (
    <div className={cx("login-container")}>
      <div className={cx("login-header", "container")}>
        <Link to="/" className={cx("login-header__logo")}>
          <img src={assets.images.logo} alt="" />
        </Link>
        <div className={cx("login-header__register-option")}>
          Already have an account?
          <Link to="/login">
            Sign in <BsArrowRight size={15} />{" "}
          </Link>
        </div>
      </div>

      <div className={cx("flex", "login-form-wrapper")}>
        <div className={cx("login-form-container")}>
          <div className={cx("login-form")}>
            <div className={cx("login-form__header")}>
              Sign up to Portfolio Social
            </div>

            <form onSubmit={formik.handleSubmit}>
              <Grid col={2} gap={20}>
                <InputField
                  label="First name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                  errors={formik.touched.firstName && formik.errors.firstName}
                />
                <InputField
                  label="Last name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                  errors={formik.touched.lastName && formik.errors.lastName}
                  className="mt-0"
                />
              </Grid>
              <InputField
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange("username")}
                onBlur={formik.handleBlur("username")}
                errors={formik.touched.username && formik.errors.username}
                className="mt-1"
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
                errors={
                  formik.touched.retypePassword && formik.errors.retypePassword
                }
              />

              <div
                className={cx("login-form__bottom", "flex", "space-between")}
              >
                <button
                  type="submit"
                  className={cx("login-form__bottom__submit-btn", "fullWidth")}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {};

export default Register;
