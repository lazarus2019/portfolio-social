import classNames from "classnames/bind";
import { BsDoorOpenFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./Board.module.scss";
import BoardFavoriteList from "./BoardFavoriteList";
import BoardPrivateList from "./BoardPrivateList";
const cx = classNames.bind(styles);

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
