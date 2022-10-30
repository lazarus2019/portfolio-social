import classNames from "classnames/bind";
import styles from "./ProfileTab.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { BasicButton } from "../Button/Button";
import { BsStar, BsFillArchiveFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

function ProfileTab(props) {
  const { user, isCurrentUser, isFollowing, onFollowing } = props;
  const handleFollowing = () => {
    if (!onFollowing) return;
    onFollowing(user?.id, true);
  };
  return (
    <div className={cx("profile-tab-container")}>
      <div className={cx("container", "flex")}>
        <div className={cx("left-content")}>
          <div className={cx("user-profile-mini")}>
            <div className={cx("user-profile-mini__photo")}>
              <img src={user?.profilePhoto} alt="" />
            </div>
            <div className={cx("user-profile-mini__username")}>
              {user?.username}
            </div>
            {isCurrentUser ? null : (
              <BasicButton
                onClick={handleFollowing}
                content={isFollowing ? "Following" : "Follow"}
              />
            )}
          </div>
        </div>
        <div className={cx("right-content")}>
          <div className={cx("tab-list")}>
            <NavLink
              to={`/@${user?.username}?tab=project`}
              className={cx("tab-list__item", "active")}
            >
              <BsFillArchiveFill size={15} />
              Project
              <span className={cx("counter")}>{user?.info?.projectCount}</span>
            </NavLink>
            {isCurrentUser ? (
              <NavLink
                to={`/@${user?.username}?tab=star`}
                className={cx("tab-list__item")}
              >
                <BsStar size={15} />
                Star
                <span className={cx("counter")}>
                  {" "}
                  {user?.info?.savedProject?.length > 0
                    ? user?.info?.savedProject?.length
                    : 0}
                </span>
              </NavLink>
            ) : user?.setting?.isPrivateAccount ? null : (
              <NavLink
                to={`/@${user?.username}?tab=star`}
                className={cx("tab-list__item")}
              >
                <BsStar size={15} />
                Star
                <span className={cx("counter")}>
                  {" "}
                  {user?.info?.savedProject?.length > 0
                    ? user?.info?.savedProject?.length
                    : 0}
                </span>
              </NavLink>
            )}
            <NavLink
              to={`/@${user?.username}?tab=follower`}
              className={cx("tab-list__item")}
            >
              Followers
              <span className={cx("counter")}>
                {user?.info?.followers?.length > 0
                  ? user?.info?.followers?.length
                  : 0}
              </span>
            </NavLink>
            <NavLink
              to={`/@${user?.username}?tab=following`}
              className={cx("tab-list__item")}
            >
              Following
              <span className={cx("counter")}>
                {user?.info?.following?.length > 0
                  ? user?.info?.following?.length
                  : 0}
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

ProfileTab.propTypes = {};

export default ProfileTab;