import classNames from "classnames/bind";
import styles from "./Login.module.scss";

import assets from "@/assets";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import queryString from "query-string";
import RegisterForm from "@/components/Forms/RegisterForm";
import userAPI from "@/api/userAPI";
import { toast } from "react-toastify";
import getErrorMessage from "@/utils/getErrorMessage";
import { useState } from "react";

function Register(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false)
  const { user_email } = queryString.parse(location.search);

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      delete values?.retypePassword;
      const result = await userAPI.register(values);
      if (result?.status) {
        toast.success("Your account is created");
        return navigate("/login");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
    setLoading(false)
  };

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
          <RegisterForm
            onSubmit={handleSubmit}
            userEmail={user_email}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {};

export default Register;
