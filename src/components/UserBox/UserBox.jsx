import classNames from "classnames/bind";
import { FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./UserBox.module.scss";
const cx = classNames.bind(styles);

function UserBox({ user, isTop }) {
  return (
    <Link to={`/@${user?.username}`} className={cx("user-box")}>
      {isTop && (
        <FaCrown size={15} className={cx("user-box__icon")} />
      )}
      <div className={cx("user-box__photo")}>
        <img src={user?.profilePhoto} alt="" />
      </div>
      <div className={cx("user-box__content")}>
        <div className={cx("user-box__content__name")}>
          {user?.fullName}
        </div>
        <div className={cx("user-box__content__username")}>
          {user?.username}
        </div>
      </div>
    </Link>
  );
}

UserBox.propTypes = {};

export default UserBox;
