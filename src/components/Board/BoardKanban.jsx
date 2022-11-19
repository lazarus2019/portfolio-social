import sectionAPI from "api/sectionAPI";
import taskAPI from "api/taskAPI";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BsFillCheckCircleFill, BsFillTrashFill, BsPlus } from "react-icons/bs";
import { toast } from "react-toastify";
import getErrorMessage from "utils/getErrorMessage";
import InputField from "../Forms/FormFields/InputField";
import Loading from "../Loading/Loading";
import styles from "./Board.module.scss";
import BoardTaskModal from "./BoardTaskModal";

const cx = classNames.bind(styles);

let timer;
const timeout = 500;

function BoardKanban(props) {
  const { data, boardId } = props;
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(undefined);

  useEffect(() => {
    if (data) {
      setSections(data);
    }
    setLoading(false);
  }, [data]);

  const handleCreateSection = async () => {
    try {
      const res = await sectionAPI.create({ boardId });
      setSections([...sections, res?.results]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDeleteSection = async (sectionId) => {
    try {
      await sectionAPI.delete(sectionId);
      const newData = [...sections].filter((e) => e.id !== sectionId);
      setSections(newData);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleUpdateSectionTitle = async (e, sectionId) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    const newData = [...sections];
    const index = newData.findIndex((e) => e.id === sectionId);
    newData[index].title = newTitle;
    setSections(newData);

    try {
      await sectionAPI.update(sectionId, { title: newTitle });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleCreateTask = async (sectionId) => {
    try {
      const res = await taskAPI.create(boardId, { sectionId });
      const newData = [...sections];
      const index = newData.findIndex((e) => e?._id === sectionId);
      newData[index].tasks?.unshift(res?.results);
      setSections(newData);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleUpdateTask = (task) => {
    const newData = [...sections];
    const sectionIndex = newData.findIndex((e) => e._id === task.section.id);
    const taskIndex = newData[sectionIndex].tasks.findIndex(
      (e) => e._id === task._id
    );

    newData[sectionIndex].tasks[taskIndex] = task;
    setSections(newData);
  };

  const handleDeleteTask = (task) => {
    const newData = [...sections];
    const sectionIndex = newData.findIndex((e) => e._id === task.section.id);
    console.log({ sectionIndex });
    const taskIndex = newData[sectionIndex].tasks.findIndex(
      (e) => e._id === task._id
    );

    newData[sectionIndex].tasks.splice(taskIndex, 1);
    setSections(newData);
  };

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    const newData = [...sections];
    const sourceColIndex = newData.findIndex(
      (e) => e?._id === source.droppableId
    );
    const destinationColIndex = newData.findIndex(
      (e) => e?._id === destination.droppableId
    );

    const sourceCol = newData[sourceColIndex];
    const destinationCol = newData[destinationColIndex];

    const sourceSectionId = sourceCol?.id;
    const destinationSectionId = destinationCol?.id;

    const sourceTasks = [...sourceCol?.tasks];
    const destinationTasks = [...destinationCol?.tasks];

    if (source?.droppableId !== destination?.droppableId) {
      const [removed] = sourceTasks?.splice(source.index, 1);
      removed.section.id = destination.droppableId;
      removed.section._id = destination.droppableId;
      destinationTasks.splice(destination.index, 0, removed);
      newData[sourceColIndex].tasks = sourceTasks;
      newData[destinationColIndex].tasks = destinationTasks;
    } else {
      const [removed] = destinationTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      newData[destinationColIndex].tasks = destinationTasks;
    }

    try {
      await taskAPI.updatePosition(boardId, {
        resourceList: sourceTasks,
        destinationList: destinationTasks,
        resourceSectionId: sourceSectionId,
        destinationSectionId: destinationSectionId,
      });
      setSections(newData);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className={cx("kanban")}>
      <div className={cx("kanban__top")}>
        <div className={cx("kanban__top__btn")} onClick={handleCreateSection}>
          Add section
        </div>
        <div className={cx("kanban__top__amount")}>
          {sections?.length > 0 ? `${sections?.length} Sections` : "0 Section"}
        </div>
      </div>
      <div className={cx("kanban__separate", "separate")}></div>
      {loading ? (
        <Loading fullHeight color="#fff" />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={cx("kanban__body")}>
            {sections?.map((section) => (
              <Droppable key={section._id} droppableId={section._id}>
                {(provided) => (
                  <div
                    className={cx("section__list")}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div
                      key={section?.id}
                      className={cx("section__list__header")}
                    >
                      <InputField
                        value={section?.title}
                        onChange={(e) =>
                          handleUpdateSectionTitle(e, section?._id)
                        }
                        noOutline
                        placeholder="Untitled"
                        className={cx("section__list__header__title")}
                      />
                      <div className={cx("section__list__header__options")}>
                        <span
                          className={cx(
                            "section__list__header__options__btn",
                            "add"
                          )}
                          onClick={() => handleCreateTask(section?._id)}
                        >
                          <BsPlus size={18} />
                        </span>
                        <span
                          className={cx(
                            "section__list__header__options__btn",
                            "delete"
                          )}
                          onClick={() => handleDeleteSection(section?._id)}
                        >
                          <BsFillTrashFill size={15} />
                        </span>
                      </div>
                    </div>

                    {/* Tasks */}

                    <div className={cx("task-box__list")}>
                      {section?.tasks?.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className={cx("task-box__list__item")}
                              key={task?._id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              isDragging={
                                snapshot.isDragging && !snapshot.isDropAnimating
                              }
                              onClick={() => setSelectedTask(task)}
                            >
                              {task?.icon} {task?.title}
                              {task?.isDone ? (
                                <BsFillCheckCircleFill
                                  size={12}
                                  className={cx(
                                    "task-box__list__item__checkdone"
                                  )}
                                />
                              ) : null}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}
      <BoardTaskModal
        currentTask={selectedTask}
        boardId={boardId}
        onClose={() => setSelectedTask(undefined)}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

BoardKanban.propTypes = {};

export default BoardKanban;
