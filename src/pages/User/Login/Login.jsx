import userAPI from "api/userAPI";
import assets from "assets";
import classNames from "classnames/bind";
import LoginForm from "components/Forms/LoginForm";
import keyStorage from "constants";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "redux/slices/userSlice";
import authUtils from "utils/authUtils";
import getErrorMessage from "utils/getErrorMessage";
import styles from "./Login.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const result = await userAPI.login(values);
      if (result?.status) {
        localStorage.setItem(keyStorage.TOKEN_KEY, result?.token);
        const user = await authUtils.isAuthenticated();
        if (user) {
          dispatch(setUser(user));
        }
        setLoading(false);
        return navigate("/");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
    setLoading(false);
  };

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

      <div className={cx("login-form-container")}>
        <LoginForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}

Login.propTypes = {};

export default Login;
