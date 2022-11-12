import classNames from "classnames/bind";
import styles from "./Board.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getErrorMessage from "@/utils/getErrorMessage";
import boardAPI from "@/api/boardAPI";
import { setFavoritesBoardList } from "@/redux/slices/boardFavoriteSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";

function BoardFavoriteList(props) {
  const dispatch = useDispatch();
  const list = useSelector((store) => store?.boardFavorite?.value);
  const [activeIndex, setActiveIndex] = useState(0);
  const { boardId } = useParams();

  const getBoards = async () => {
    try {
      const res = await boardAPI.getFavorite();
      dispatch(setFavoritesBoardList(res?.results));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getBoards();
  }, [dispatch]);

  useEffect(() => {
    const index = list?.findIndex((e) => e.id === boardId);
    setActiveIndex(index);
  }, [boardId, list]);

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    const newList = [...list];
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);

    const activeItem = newList.findIndex((e) => e.id === boardId);
    setActiveIndex(activeItem);
    dispatch(setFavoritesBoardList(newList));

    try {
      await boardAPI.updateFavoritePosition({ boards: newList });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div>
      <div className={cx("board-sidebar__top", "flex space-between")}>
        <h3 className={cx("board-sidebar__header")}>Favorites</h3>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          key={"list-board-droppable"}
          droppableId={"list-board-droppable"}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              className={cx("board-sidebar__list", "favorite-list")}
              {...provided.droppableProps}
            >
              {list?.map((item, index) => (
                <Draggable key={item?.id} draggableId={item?.id} index={index}>
                  {(provided, snapshot) => (
                    <Link
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className={cx(
                        "board-sidebar__list__item",
                        `${index === activeIndex ? "active" : ""}`
                      )}
                      to={`/boards/${item?.id}`}
                      isDragging={
                        snapshot.isDragging && !snapshot.isDropAnimating
                      }
                    >
                      {item?.icon} {item?.title}
                    </Link>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

BoardFavoriteList.propTypes = {};

export default BoardFavoriteList;
