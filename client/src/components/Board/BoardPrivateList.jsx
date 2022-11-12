import classNames from "classnames/bind";
import styles from "./Board.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getErrorMessage from "@/utils/getErrorMessage";
import boardAPI from "@/api/boardAPI";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { setBoards } from "@/redux/slices/boardSlice";
import { BsPlusSquare } from "react-icons/bs";

function BoardPrivateList(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boards = useSelector((store) => store?.boards?.value);
  const [activeIndex, setActiveIndex] = useState(0);
  const { boardId } = useParams();

  const getBoards = async () => {
    try {
      const res = await boardAPI.getAll();
      dispatch(setBoards(res?.results));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getBoards();
  }, [dispatch]);

  useEffect(() => {
    const index = boards?.findIndex((e) => e.id === boardId);
    setActiveIndex(index);
  }, [boardId, boards]);

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    const newList = [...boards];
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);

    const activeItem = newList.findIndex((e) => e.id === boardId);
    setActiveIndex(activeItem);
    dispatch(setBoards(newList));

    try {
      await boardAPI.updatePosition({ boards: newList });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

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
    <div>
      <div className={cx("board-sidebar__top", "flex space-between")}>
        <h3 className={cx("board-sidebar__header")}>Private</h3>
        <BsPlusSquare size={18} onClick={handleCreateBoard} />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          key={"boards-private-board-droppable"}
          droppableId={"boards-private-board-droppable"}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              className={cx("board-sidebar__list", "private-list")}
              {...provided.droppableProps}
            >
              {boards?.map((item, index) => (
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

BoardPrivateList.propTypes = {};

export default BoardPrivateList;
