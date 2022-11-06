import classNames from "classnames/bind";
import styles from "./VerifyAccount.module.scss";
const cx = classNames.bind(styles);
import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import getErrorMessage from "@/utils/getErrorMessage";
import userAPI from "@/api/userAPI";

function VerifyAccount(props) {
  const [loading, setLoading] = useState(false);
  const [isSend, setSend] = useState(false);
  const user = useSelector((store) => store?.user?.value);

  const handleSendVerifyEmail = async () => {
    setSend(false);
    setLoading(true);
    if (user) {
      try {
        const res = await userAPI.sendVerifyAccount();
        setSend(true);
        toast.success("Email is sent!");
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }
    setLoading(false);
  };
  return (
    <>
      {user ? (
        <>
          {user?.isAccountVerified ? null : (
            <>
              <div className={cx("verify")}>
                <div className={cx("verify__message")}>
                  You need to verify your email address to activate your account
                </div>
                {isSend ? null : (
                  <div
                    onClick={handleSendVerifyEmail}
                    className={cx("verify__btn")}
                  >
                    {loading ? "Loading..." : "Send verification email"}
                  </div>
                )}
              </div>
              {isSend ? (
                <div className={cx("verify__sent")}>
                  <div className={cx("verify__sent__message")}>
                    The email is sent to {user?.email}, please check and verify
                  </div>
                  <div
                    onClick={handleSendVerifyEmail}
                    className={cx("verify__sent__btn")}
                  >
                    Click here to re-send
                  </div>
                </div>
              ) : null}
            </>
          )}
        </>
      ) : null}
    </>
  );
}

VerifyAccount.propTypes = {};

export default VerifyAccount;
