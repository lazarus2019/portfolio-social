import classNames from "classnames/bind";
import styles from "./Login.module.scss";

import assets from "@/assets";

const cx = classNames.bind(styles);
import { Link,  useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import LoginForm from "@/components/Forms/LoginForm";
import { toast } from "react-toastify";
import userAPI from "@/api/userAPI";
import keyStorage from "@/constants";
import authUtils from "@/utils/authUtils";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const result = await userAPI.login(values);
      if (result?.status) {
        localStorage.setItem(keyStorage.TOKEN_KEY, result?.token);
        const user = await authUtils.isAuthenticated()
        if(user){
          dispatch(setUser(user))
        }
        return navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
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
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

Login.propTypes = {};

export default Login;
