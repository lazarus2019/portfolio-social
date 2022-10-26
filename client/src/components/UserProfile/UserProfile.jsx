import classNames from "classnames/bind";
import styles from "./UserProfile.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { BsFillPeopleFill, BsLink45Deg } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import Button from "../Button/Button";
import Grid from "../Grid/Grid";
import { BasicButton } from "../Button/Button";

function UserProfile({ user }) {
  const isCurrentUser = true;
  return (
    <div className={cx("user")}>
      <div className={cx("user-photo")}>
        <img src={user?.profilePhoto} alt="" />
      </div>
      <Grid col={2}>
        <div className={cx("user-name")}>
          {user?.firstName} {user?.lastName}
        </div>
        <div className={cx("user-username")}>{user?.username}</div>
      </Grid>
      {isCurrentUser ? (
        <BasicButton content="Edit profile" className="fullWidth" />
      ) : (
        <BasicButton content="Follow" className="fullWidth" />
      )}
      {user?.setting?.isPrivateAccount ? null : (
        <div className={cx("user-follow")}>
          <BsFillPeopleFill size={15} />
          <NavLink className={cx("user-follow__link")}>
            {user?.info?.follower?.length > 0
              ? user?.info?.follower?.length
              : 0}{" "}
            followers
          </NavLink>
          {" · "}
          <NavLink className={cx("user-follow__link")}>
            {user?.info?.following?.length > 0
              ? user?.info?.following?.length
              : 0}{" "}
            following
          </NavLink>
        </div>
      )}
      <div className={cx("user-bio")}>{user?.info?.bio}</div>
      {/* External link will be here */}
      <div>
        {user?.info?.externalLinks.length > 0
          ? user?.info?.externalLinks.map((link, index) => (
              <div className={cx("user-external-link")} key={index}>
                <BsLink45Deg size={15} /> {link.title}:{" "}
                <a href={link.url}>{link.url}</a>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserProfile;
