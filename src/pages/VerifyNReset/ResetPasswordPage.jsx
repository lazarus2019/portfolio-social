import userAPI from "api/userAPI";
import assets from "assets";
import classNames from "classnames/bind";
import ResetPasswordForm from "components/Forms/ResetPasswordForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "redux/slices/userSlice";
import getErrorMessage from "utils/getErrorMessage";
import styles from "./VerifyNReset.module.scss";

const cx = classNames.bind(styles);

const REDIRECT_DELAY = 3000;

function ResetPasswordPage(props) {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      const res = await userAPI.resetPassword({ ...values, token });
      toast.success(
        `Your change is saved, redirect to Login in ${REDIRECT_DELAY / 1000}s`
      );
      const timer = setTimeout(() => {
        dispatch(logout());
        navigate("/login");
        clearTimeout(timer);
      }, REDIRECT_DELAY);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
    setLoading(false);
  };
  return (
    <div className={cx("forgot-container", "flex", "y-center", "x-center")}>
      <div className={cx("forgot-container__form")}>
        <div className={cx("forgot-container__form__logo")}>
          <img src={assets.images.logo} alt="" />
        </div>
        <div className={cx("forgot-container__form__header")}>
          Please create a new password that you don't use on other site.
        </div>
        <ResetPasswordForm onSubmit={handleResetPassword} loading={loading} />
        <div className={cx("forgot-container__form__option")}>
          Token expired? <Link to="/forgot-password">Re-send</Link>
        </div>
      </div>
    </div>
  );
}

ResetPasswordPage.propTypes = {};

export default ResetPasswordPage;
