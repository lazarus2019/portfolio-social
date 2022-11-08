import classNames from "classnames/bind";
import styles from "./SettingPage.module.scss";

const cx = classNames.bind(styles);
import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import ProfileInfoForm from "@/components/Forms/ProfileInfoForm";
import SettingTab from "@/components/SettingTab/SettingTab";
import { BasicButton } from "@/components/Button/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import getErrorMessage from "@/utils/getErrorMessage";
import { useDispatch } from "react-redux";
import userAPI from "@/api/userAPI";
import { setUser } from "@/redux/slices/userSlice";

function SettingPage(props) {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("info");
  const user = useSelector((store) => store?.user?.value);
  const [loading, setLoading] = useState(false);
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
        return <div>Account Tab</div>;
      case "email":
        return <div>Email Tab</div>;
      case "project":
        return <div>Project Tab</div>;
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
