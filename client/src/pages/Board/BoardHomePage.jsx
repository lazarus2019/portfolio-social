import classNames from "classnames/bind";
import styles from "./BoardPage.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import getErrorMessage from "@/utils/getErrorMessage";
import boardAPI from "@/api/boardAPI";
import { useDispatch } from "react-redux";
import { setBoards } from "@/redux/slices/boardSlice";
import { useSelector } from "react-redux";

function BoardHomePage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(store =>store?.boards?.value)

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
