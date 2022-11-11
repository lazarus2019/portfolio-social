import classNames from "classnames/bind";
import styles from "./Board.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { BsDoorOpenFill } from "react-icons/bs";
import BoardFavoriteList from "./BoardFavoriteList";
import { Link } from "react-router-dom";
import BoardPrivateList from "./BoardPrivateList";

function BoardSidebar(props) {
  const { user } = props;
  return (
    <div className={cx("board-sidebar")}>
      <div className={cx("board-sidebar__user-info")}>
        <p>{user?.username}</p>
        <Link to="/">
          <BsDoorOpenFill size={18} />
        </Link>
      </div>
      <div className={cx("board-sidebar__content")}>
        <BoardFavoriteList />
        <BoardPrivateList />
      </div>
    </div>
  );
}

BoardSidebar.propTypes = {};

export default BoardSidebar;
