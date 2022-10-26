import classNames from "classnames/bind";
import styles from "./ProjectBox.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BsFillStarFill } from "react-icons/bs";

function ProjectBox({ project, maxHeight }) {
  const style = {
    backgroundImage: `url(${project.thumbnail})`,
  };
  return (
    <Link to={`/project/${project?.slug}`} className={cx(`project-box`)}>
      <div className={cx("project-box__star")}>
        3.4k
        <BsFillStarFill size={10} />
      </div>
      <div className={cx("project-box__thumbnail")} style={style}></div>
      <div className={cx("project-box__wrapper")}>
        <div className={cx("project-box__userPhoto")}>
          <img src={project?.user?.profilePhoto} alt="" />
        </div>
        <div className={cx("project-box__content")}>
          <h3 className={cx("project-box__content__title")}>
            {project?.title}
          </h3>
          <Link
            to={`/@${project?.user?.username}`}
            className={cx("project-box__content__username")}
          >
            {project?.user?.username}
          </Link>
        </div>
      </div>
    </Link>
  );
}

ProjectBox.propTypes = {};

export default ProjectBox;
