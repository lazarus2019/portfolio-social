import classnames from "classnames/bind";
import {
  BsFillBookmarkStarFill,
  BsThreeDots
} from "react-icons/bs";
import { Link } from "react-router-dom";
import dateFormatter, { fromNowDateFormatter } from "utils/dateFormatter";
import styles from "./DetailProject.module.scss";

const cx = classnames.bind(styles);

function ProjectAuthor(props) {
  const { project, isSaved, onGetShareLink, onSaving } = props;

  const handleGetShareLink = () => {
    if (!onGetShareLink) return;
    onGetShareLink();
  };

  const handleSaving = () => {
    if (!onSaving) return;
    onSaving();
  };

  return (
    <div
      className={cx(
        "project-content__header",
        "flex",
        "space-between",
        "y-center"
      )}
    >
      <div className={cx("project-content__header__author")}>
        <Link
          to={`/@${project.user.username}`}
          className={cx("project-content__header__author__photo")}
        >
          <img src={project.user.profilePhoto} alt="" />
        </Link>
        <div className={cx("project-content__header__author__info")}>
          <Link
            to={`/@${project.user.username}`}
            className={cx("project-content__header__author__info__username")}
          >
            {project.user.fullName}
          </Link>
          <p className={cx("project-content__header__author__info__date")}>
            {dateFormatter(project?.createdAt)}
          </p>
          <p className={cx("project-content__header__author__info__date")}>
            Updated at {fromNowDateFormatter(project?.updatedAt)}
          </p>
        </div>
      </div>
      <div className={cx("project-content__header__options")}>
        <span
          className={cx(`${isSaved ? "active" : ""}`)}
          onClick={handleSaving}
        >
          <BsFillBookmarkStarFill size={20} />
        </span>
        <span onClick={handleGetShareLink}>
          <BsThreeDots size={20} />
        </span>
      </div>
    </div>
  );
}

ProjectAuthor.propTypes = {};

export default ProjectAuthor;
