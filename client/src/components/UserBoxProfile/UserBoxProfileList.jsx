import classNames from "classnames/bind";
import styles from "./UserBoxProfileList.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";
import { BasicButton } from "../Button/Button";
import Empty from "../Empty/Empty";
import Pagination from "../Pagination/Pagination";
import { useMemo } from "react";

const ITEMS_PER_PAGE = 15;
function UserBoxProfileList(props) {
  const {
    users,
    currentUser = null,
    onFollowing = () => {},
    onPageChange = () => {},
    currentPage = 1,
    totalRows = 1,
    emptyContent = "Don't have content yet!",
  } = props;
  const totalPage = useMemo(() => {
    return Math.ceil(totalRows / ITEMS_PER_PAGE);
  });
  return (
    <>
      {users && users?.length > 0 ? (
        users.map((user, index) => (
          <UserBoxProfileItem
            key={index}
            user={user}
            onFollowing={onFollowing}
            isCurrentUser={user.id === currentUser?.id}
            isFollowing={
              currentUser && user.followers.indexOf(currentUser?.id) >= 0
            }
          />
        ))
      ) : (
        <Empty desc={emptyContent} />
      )}
      {totalPage > 1 ? (
        <Pagination
          onPageChange={onPageChange}
          totalPage={totalPage}
          currentPage={currentPage}
        />
      ) : null}
    </>
  );
}

function UserBoxProfileItem(props) {
  const {
    user,
    isFollowing = false,
    isCurrentUser = false,
    onFollowing,
  } = props;
  const handleFollowing = () => {
    if (!onFollowing) return;
    onFollowing(user?.id);
  };
  return (
    <div className={cx("user-container", "flex")}>
      <Link to={`/@${user?.username}`} className={cx("user-container__photo")}>
        <img src={user?.profilePhoto} alt="" />
      </Link>
      <div className={cx("user-box")}>
        <div className={cx("user-box__content")}>
          <Link
            to={`/@${user?.username}`}
            className={cx("user-box__content__header")}
          >
            <div className={cx("user-box__content__header__name")}>
              {user?.fullName}
            </div>
            <div className={cx("user-box__content__header__username")}>
              {user?.username}
            </div>
          </Link>
          {user?.bio && (
            <div className={cx("user-box__content__desc")}>{user?.bio}</div>
          )}
          <div className={cx("user-box__content__follow")}>
            <BsFillPeopleFill size={15} />
            <div className={cx("user-box__content__follow__box")}>
              {user?.followers?.length > 0 ? user?.followers?.length : 0}{" "}
              followers
            </div>
            {" · "}
            <div className={cx("user-box__content__follow__box")}>
              {user?.following?.length > 0 ? user?.following?.length : 0}{" "}
              following
            </div>
          </div>
        </div>
        {isCurrentUser ? null : (
          <div className={cx("user-box__following")}>
            <BasicButton
              onClick={handleFollowing}
              content={isFollowing ? "Unfollow" : "Follow"}
              className={cx("user-box__following__btn")}
            />
          </div>
        )}
      </div>
    </div>
  );
}

UserBoxProfileList.propTypes = {};

export default UserBoxProfileList;
