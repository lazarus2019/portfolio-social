import taskAPI from "api/taskAPI";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import dateFormatter from "utils/dateFormatter";
import getErrorMessage from "utils/getErrorMessage";
import Editor from "../Editor/Editor";
import InputField from "../Forms/FormFields/InputField";
import Modal from "../Modal/Modal";
import styles from "./Board.module.scss";
import EmojiPicker from "./EmojiPicker";

const cx = classNames.bind(styles);
let timer;
const timeout = 500;

function BoardTaskModal(props) {
  const { boardId, currentTask, onUpdate, onClose, onDelete } = props;
  const [task, setTask] = useState(currentTask);
  const [showModal, setShowModal] = useState(false);
  const [taskInfo, setTaskInfo] = useState({
    title: "",
    content: "",
    icon: "",
    isDone: false,
  });

  useEffect(() => {
    setTask(currentTask);
    setTaskInfo({
      title: currentTask !== undefined ? currentTask?.title : "",
      content: currentTask !== undefined ? currentTask?.content : "",
      icon: currentTask !== undefined ? currentTask?.icon : "",
      isDone: currentTask !== undefined ? currentTask?.isDone : false,
    });
    if (currentTask !== undefined) {
      setShowModal(true);
    }
  }, [currentTask]);

  const handleClose = () => {
    setShowModal(false);
    if (onUpdate) onUpdate(task);
    if (onClose) onClose();
  };

  const handleTitleChange = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    timer = setTimeout(async () => {
      try {
        await taskAPI.update(task?._id, { title: newTitle });
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }, timeout);

    task.title = newTitle;
    setTaskInfo({
      ...task,
      title: newTitle,
    });
    if (onUpdate) onUpdate(task);
  };

  const handleDescChange = async (data) => {
    clearTimeout(timer);
    if (!showModal) {
      timer = setTimeout(async () => {
        try {
          await taskAPI.update(task?._id, { content: data });
        } catch (error) {
          toast.error(getErrorMessage(error));
        }
      }, timeout);

      task.content = data;
      setTaskInfo({
        ...task,
        content: data,
      });
      if (onUpdate) onUpdate(task);
    }
  };

  const handleIconChange = async (newIcon) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      try {
        await taskAPI.update(task.id, { icon: newIcon });
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }, timeout);

    task.icon = newIcon;
    setTaskInfo({
      ...task,
      icon: newIcon,
    });
    if (onUpdate) onUpdate(task);
  };

  const handleDeleteTask = async () => {
    if (onDelete) onDelete(task);
    setTask(undefined);
    setShowModal(false);
    // try {
    //   await taskAPI.delete(task.id);
    //   if (onDelete) onDelete(task);
    //   setTask(undefined);
    //   setShowModal(false);
    // } catch (err) {
    //   toast.error(getErrorMessage(error));
    // }
  };

  const handleCheckDone = async () => {
    try {
      await taskAPI.update(task?._id, { isDone: !taskInfo.isDone });
      task.isDone = !taskInfo.isDone;
      setTaskInfo({
        ...task,
        isDone: !taskInfo.isDone,
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return showModal ? (
    <Modal>
      <div className={cx("task-box")}>
        <span className={cx("task-box__delete-btn")} onClick={handleDeleteTask}>
          <BsFillTrashFill size={15} />
        </span>
        <div className={cx("task-box__header", "flex", "y-center")}>
          <EmojiPicker icon={taskInfo.icon} onChange={handleIconChange} />
          <InputField
            value={taskInfo?.title}
            onChange={handleTitleChange}
            noOutline
            placeholder="Untitled"
            className={cx("task-box__header__title")}
          />
        </div>
        <div className={cx("task-box__create-date")}>
          {dateFormatter(task?.createdAt)}
        </div>
        <Editor
          theme="dark"
          name="content"
          onChange={handleDescChange}
          value={taskInfo?.content}
          editorLoaded={true}
        />
        <div className={cx("task-box__bottom", "flex", "space-between")}>
          <div className={cx("kanban__top__btn")} onClick={handleCheckDone}>
            {task?.isDone ? "Remove done" : "Check done"}
          </div>
          <div className={cx("kanban__top__btn")} onClick={handleClose}>
            Close
          </div>
        </div>
      </div>
    </Modal>
  ) : null;
}

BoardTaskModal.propTypes = {};

export default BoardTaskModal;
