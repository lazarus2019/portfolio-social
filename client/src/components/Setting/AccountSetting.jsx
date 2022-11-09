import classNames from "classnames/bind";
import styles from "./Setting.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import ChangePasswordForm from "../Forms/ChangePasswordForm";
import DeleteAccount from "../DeleteAccount/DeleteAccount";
import PrivateAccount from "../PrivateAccount/PrivateAccount";

function AccountSetting(props) {
  const {
    isChangedPassword,
    onChangePassword,
    user,
    onChangePrivate,
    isChangedPrivate,
  } = props;
  return (
    <div className={cx("setting-container")}>
      <h2 className={cx("setting__header")}>Change password</h2>
      <div className={cx("setting__content")}>
        <ChangePasswordForm
          loading={isChangedPassword}
          onUpdate={onChangePassword}
        />
      </div>
      <h2 className={cx("setting__header")}>Set private account</h2>
      <div className={cx("setting__content")}>
        <PrivateAccount
          isPrivate={!!user?.isPrivateAccount}
          onUpdate={onChangePrivate}
          loading={isChangedPrivate}
        />
      </div>
      <h2 className={cx("setting__header", "danger")}>Delete account</h2>
      <div className={cx("setting__content")}>
        <DeleteAccount />
      </div>
    </div>
  );
}

AccountSetting.propTypes = {};

export default AccountSetting;
