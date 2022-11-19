import boardAPI from "api/boardAPI";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { setBoards } from "redux/slices/boardSlice";
import getErrorMessage from "utils/getErrorMessage";
import styles from "./BoardPage.module.scss";

const cx = classNames.bind(styles);

function BoardHomePage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector((store) => store?.boards?.value);

  const handleCreateBoard = async () => {
    try {
      const res = await boardAPI.create();
      const newList = [res?.results, ...boards];
      dispatch(setBoards(newList));
      navigate(`/boards/${res?.results?._id}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  return (
    <div className={cx("board-homepage")}>
      <div className={cx("board-homepage__btn")} onClick={handleCreateBoard}>
        Click here to create new board
      </div>
    </div>
  );
}

BoardHomePage.propTypes = {};

export default BoardHomePage;
