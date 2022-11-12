import classNames from "classnames/bind";
import styles from "./BoardPage.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BsFillStarFill, BsFillTrashFill } from "react-icons/bs";
import InputField from "@/components/Forms/FormFields/InputField";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import getErrorMessage from "@/utils/getErrorMessage";
import boardAPI from "@/api/boardAPI";
import Loading from "@/components/Loading/Loading";
import { useDispatch } from "react-redux";
import { setFavoritesBoardList } from "@/redux/slices/boardFavoriteSlice";
import { setBoards } from "@/redux/slices/boardSlice";
import { useSelector } from "react-redux";
import EmojiPicker from "@/components/Board/EmojiPicker";
import { TextareaFieldWithoutDefaultValue } from "@/components/Forms/FormFields/TextAreaField";
import BoardKanban from "@/components/Board/BoardKanban";

let timer;
const timeout = 500;

function BoardPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [boardInfo, setBoardInfo] = useState({
    icon: "",
    description: "",
    title: "",
    sections: [],
  });
  const [isFavorite, setFavorite] = useState(false);
  const { boardId } = useParams();
  const boards = useSelector((store) => store?.boards?.value);
  const favoriteList = useSelector((store) => store?.boardFavorite?.value);

  const getBoard = async (signal) => {
    try {
      const res = await boardAPI.getById(boardId, { signal });
      setBoardInfo({
        icon: res?.results?.icon,
        description: res?.results?.description,
        title: res?.results?.title,
        sections: res?.results?.sections,
      });
      setFavorite(res?.results?.isFavorite);
    } catch (error) {
      if (error.name !== "AbortError") toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (boardId) {
      getBoard(signal);
    }
    setLoading(false);
    //cleanup function
    return () => {
      controller.abort();
    };
  }, [boardId]);

  const handleDelete = async () => {
    try {
      await boardAPI.delete(boardId);

      if (isFavorite) {
        const newFavoriteList = favoriteList.filter((e) => e?._id !== boardId);
        dispatch(setFavoritesBoardList(newFavoriteList));
      }
      const newList = boards?.filter((e) => e?._id !== boardId);
      dispatch(setBoards(newList));
      if (newList?.length === 0) {
        navigate("/boards");
      } else {
        navigate(`/boards/${newList[0]?.id}`);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleToggleFavorite = async () => {
    try {
      const res = await boardAPI.updateBoard(boardId, {
        isFavorite: !isFavorite,
      });
      let newFavoriteList = [...favoriteList];
      if (isFavorite) {
        newFavoriteList = newFavoriteList.filter((e) => e.id !== boardId);
      } else {
        newFavoriteList.unshift(res?.results);
      }
      dispatch(setFavoritesBoardList(newFavoriteList));
      setFavorite(!isFavorite);
    } catch (err) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleIconChange = async (newIcon) => {
    clearTimeout(timer);
    changeBoardInfo({
      icon: newIcon,
    });
    let temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], icon: newIcon };

    dispatch(setBoards(temp));

    if (isFavorite) {
      let tempFavorite = [...favoriteList];
      const favoriteIndex = tempFavorite.findIndex((e) => e?._id === boardId);
      tempFavorite[favoriteIndex] = {
        ...tempFavorite[favoriteIndex],
        icon: newIcon,
      };

      dispatch(setFavoritesBoardList(tempFavorite));
    }

    timer = setTimeout(async () => {
      try {
        await boardAPI.updateBoard(boardId, { icon: newIcon });
      } catch (err) {
        toast.error(getErrorMessage(error));
      }
    }, timeout);
  };

  const handleChangeTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e?.target?.value;
    changeBoardInfo({
      title: newTitle,
    });
    let temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], title: newTitle };

    dispatch(setBoards(temp));

    if (isFavorite) {
      let tempFavorite = [...favoriteList];
      const favoriteIndex = tempFavorite.findIndex((e) => e?._id === boardId);
      tempFavorite[favoriteIndex] = {
        ...tempFavorite[favoriteIndex],
        title: newTitle,
      };

      dispatch(setFavoritesBoardList(tempFavorite));
    }

    timer = setTimeout(async () => {
      try {
        await boardAPI.updateBoard(boardId, { title: newTitle });
      } catch (err) {
        toast.error(getErrorMessage(error));
      }
    }, timeout);
  };

  const handleChangeDesc = async (e) => {
    clearTimeout(timer);
    const newDesc = e.target.value;
    changeBoardInfo({
      description: newDesc,
    });

    timer = setTimeout(async () => {
      try {
        await boardAPI.updateBoard(boardId, { description: newDesc });
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }, timeout);
  };

  const changeBoardInfo = (newInfo) => {
    setBoardInfo({ ...boardInfo, ...newInfo });
  };

  return (
    <div className={cx("board-container")}>
      {loading ? (
        <Loading fullHeight color="#fff" />
      ) : (
        <div className={cx("board-container__wrapper")}>
          <div className={cx("board-box")}>
            <div
              onClick={handleToggleFavorite}
              className={cx(
                "board-box__star-btn",
                `${isFavorite ? "active" : ""}`
              )}
            >
              <BsFillStarFill size={18} />
            </div>
            <div onClick={handleDelete} className={cx("board-box__delete-btn")}>
              <BsFillTrashFill size={18} />
            </div>
            <div className={cx("board-box__content")}>
              {/* emoji picker */}
              <EmojiPicker icon={boardInfo?.icon} onChange={handleIconChange} />

              <InputField
                value={boardInfo?.title}
                noOutline
                onChange={handleChangeTitle}
                placeholder="Untitled"
                className={cx("board-box__content__title")}
              />
              <TextareaFieldWithoutDefaultValue
                value={boardInfo?.description}
                onChange={handleChangeDesc}
                className={cx("board-box__content__desc")}
                placeholder={`Add description here
                You can add multiline description
                Let's start...`}
              />
            </div>
          </div>

          <BoardKanban data={boardInfo?.sections} boardId={boardId} />
        </div>
      )}
    </div>
  );
}

BoardPage.propTypes = {};

export default BoardPage;
