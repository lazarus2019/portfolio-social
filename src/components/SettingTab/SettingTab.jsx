import classNames from "classnames/bind";
import {
  BsEnvelopeFill, BsFillFolderFill, BsGearFill, BsPersonFill
} from "react-icons/bs";
import styles from "./SettingTab.module.scss";

const cx = classNames.bind(styles);

const settingTabs = [
  {
    title: "Profile Info",
    tab: "info",
    icon: <BsPersonFill size={15} />,
  },
  {
    title: "Account",
    tab: "account",
    icon: <BsGearFill size={15} />,
  },
  {
    title: "Email",
    tab: "email",
    icon: <BsEnvelopeFill size={15} />,
  },
  {
    title: "Projects",
    tab: "project",
    icon: <BsFillFolderFill size={15} />,
  },
];

function SettingTab(props) {
  const { onChangeTab, currentTab } = props;
  const handleChangeTab = (tab) => {
    if (!onChangeTab) return;
    onChangeTab(tab);
  };
  return (
    <div className={cx("setting-tab-container")}>
      <div className={cx("setting-tab__list")}>
        {settingTabs?.map((tab) => (
          <div
            className={cx(
              "setting-tab__list__item",
              "flex",
              "y-center",
              `${currentTab === tab.tab ? "active" : ""}`
            )}
            onClick={() => handleChangeTab(tab.tab)}
          >
            {tab.icon}
            {tab.title}
          </div>
        ))}
      </div>
    </div>
  );
}

SettingTab.propTypes = {};

export default SettingTab;
