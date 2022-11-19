import userAPI from "api/userAPI";
import classNames from "classnames/bind";
import { useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { logout } from "redux/slices/userSlice";
import getErrorMessage from "utils/getErrorMessage";
import styles from "./VerifyNReset.module.scss";

const cx = classNames.bind(styles);

const REDIRECT_DELAY = 3000;

function VerifyAccountPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await userAPI.verifyAccount({ token });
      toast.success(
        `Verification success, redirect to Login in ${REDIRECT_DELAY / 1000}s`
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

  const handleResend = async () => {
    setResendLoading(true);
    try {
      const res = await userAPI.sendVerifyAccount();
      toast.success("Email is sent!");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
    setResendLoading(false);
  };

  return (
    <>
      {token ? (
        <div className={cx("verify-wrapper")}>
          <div className={cx("verify-container")}>
            <div className={cx("verify-container__header")}>
              <BsFillCheckSquareFill size={35} />
              Thanks for signing up! We just need you to click the button below
              to complete setting up your account.
            </div>
            <div className="flex space-between">
              <div
                className={cx("verify-container__btn")}
                onClick={handleResend}
              >
                {resendLoading ? "Loading..." : "Re-send"}
              </div>
              <div
                className={cx("verify-container__btn")}
                onClick={handleVerify}
              >
                {loading ? "Loading..." : "Verify now"}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

VerifyAccountPage.propTypes = {};

export default VerifyAccountPage;
