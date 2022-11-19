import userAPI from "api/userAPI";
import assets from "assets";
import classNames from "classnames/bind";
import ForgotPasswordForm from "components/Forms/ForgotPasswordForm";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import getErrorMessage from "utils/getErrorMessage";
import styles from "./VerifyNReset.module.scss";

const cx = classNames.bind(styles);

function ForgotPasswordPage(props) {
  const [loading, setLoading] = useState(false);
  const handleSendForgotPassword = async (values) => {
    setLoading(true);
    try {
      const res = await userAPI.forgetPassword(values);
      toast.success("Email sent! Please check your mail box");
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
          Enter the email address associated with your account and we'll send
          you a link to reset your password.
        </div>
        <ForgotPasswordForm
          onSubmit={handleSendForgotPassword}
          loading={loading}
        />
        <div className={cx("forgot-container__form__option")}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

ForgotPasswordPage.propTypes = {};

export default ForgotPasswordPage;
