import classNames from "classnames/bind";
import styles from "./Login.module.scss";

import assets from "@/assets";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { useFormik } from "formik";
import * as yup from "yup";
import InputField from "@/components/FormFields/InputField/InputField";
import PasswordField from "@/components/FormFields/InputField/PasswordField";

const formSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must at least 6 characters"),
});

function Login(props) {
  // formik
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
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
          New to Portfolio Social?
          <Link to="/register">
            Create an account <BsArrowRight size={15} />{" "}
          </Link>
        </div>
      </div>

      <div className={cx("flex", "login-form-wrapper")}>
        <div className={cx("login-form-container")}>
          <div className={cx("login-form")}>
            <div className={cx("login-form__header")}>
              Sign in to Portfolio Social
            </div>

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

              <div
                className={cx("login-form__bottom", "flex", "space-between")}
              >
                <Link to="/forget-password">Forgot Password?</Link>

                <button
                  type="submit"
                  className={cx("login-form__bottom__submit-btn")}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {};

export default Login;
