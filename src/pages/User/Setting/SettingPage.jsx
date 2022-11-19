import userAPI from "api/userAPI";
import classNames from "classnames/bind";
import { BasicButton } from "components/Button/Button";
import ProfileInfoForm from "components/Forms/ProfileInfoForm";
import AccountSetting from "components/Setting/AccountSetting";
import EmailSetting from "components/Setting/EmailSetting";
import ProjectSetting from "components/Setting/ProjectSetting";
import SettingTab from "components/SettingTab/SettingTab";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "redux/slices/userSlice";
import getErrorMessage from "utils/getErrorMessage";
import styles from "./SettingPage.module.scss";

const cx = classNames.bind(styles);

function SettingPage(props) {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("info");
  const user = useSelector((store) => store?.user?.value);
  const [loading, setLoading] = useState(false);
  const [isChangedPassword, setChangedPassword] = useState(false);
  const [isUpdatePhoto, setUpdatePhoto] = useState(false);

  const renderTab = () => {
    switch (currentTab) {
      case "info":
        return (
          <ProfileInfoForm
            user={user}
            loading={loading}
            onUpdate={handleUpdateProfileInfo}
            onUpdatePhoto={handleUpdatePhoto}
            isUpdatePhoto={isUpdatePhoto}
          />
        );
      case "account":
        return (
          <AccountSetting
            user={user}
            onChangePassword={handleChangePassword}
            isChangedPassword={isChangedPassword}
            onChangePrivate={handleChangePrivate}
          />
        );
      case "email":
        return <EmailSetting />;
      case "project":
        return <ProjectSetting />;
      default:
        return (
          <ProfileInfoForm
            user={user}
            loading={loading}
            onUpdate={handleUpdateProfileInfo}
            onUpdatePhoto={handleUpdatePhoto}
            isUpdatePhoto={isUpdatePhoto}
          />
        );
    }
  };

  const handleChangeTab = (tab) => {
    setCurrentTab(tab);
  };

  const handleUpdatePhoto = async (photo) => {
    setUpdatePhoto(true);
    const formData = new FormData();
    formData.append("photo", photo);
    try {
      const res = await userAPI.updateProfilePhoto(formData);
      dispatch(setUser({ ...user, ...res }));
      toast.success("Profile photo updated!");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
    setUpdatePhoto(false);
  };

  const handleUpdateProfileInfo = async (values) => {
    setLoading(true);

    try {
      const res = await userAPI.updateProfile(values);
      dispatch(setUser({ ...user, ...res }));
      toast.success("Your changes have been successfully saved!");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
    setLoading(false);
  };

  const handleChangePassword = async (values) => {
    try {
      const res = await userAPI.changePassword(values);
      toast.success("Your password have been updated!");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleChangePrivate = async (values) => {
    try {
      const res = await userAPI.changePrivateSetting(values);
      dispatch(setUser({ ...user, isPrivateAccount: values.isPrivate }));
      toast.success("Your changes have been successfully saved!");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  return (
    <div className={cx("setting-container", "container")}>
      <div
        className={cx("setting-header", "flex", "y-center", "space-between")}
      >
        <div className={cx("setting-header__user", "flex", "y-center")}>
          <div className={cx("setting-header__user__photo")}>
            <img src={user?.profilePhoto} alt="" />
          </div>
          <div className={cx("setting-header__user__info")}>
            <Link to={`/@${user?.username}`}>{user?.username}</Link>
            <p>Your personal account</p>
          </div>
        </div>
        <BasicButton
          to={`/@${user?.username}`}
          content="Go to your personal profile"
          className={cx("setting-header__btn")}
        />
      </div>
      <div className={cx("setting-body", "flex")}>
        <div className={cx("setting-sidebar")}>
          <SettingTab onChangeTab={handleChangeTab} currentTab={currentTab} />
        </div>
        <div className={cx("setting-content")}>{renderTab()}</div>
      </div>
    </div>
  );
}

SettingPage.propTypes = {};

export default SettingPage;
