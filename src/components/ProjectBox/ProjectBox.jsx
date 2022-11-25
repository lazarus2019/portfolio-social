import classNames from "classnames/bind";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./ProjectBox.module.scss";
const cx = classNames.bind(styles);

function ProjectBox({ project, maxHeight }) {
  const style = {
    backgroundImage: `url(${project.thumbnail})`,
  };
  return (
    <Link to={`/p/${project?.slug}`} className={cx(`project-box`)}>
      {project.starCount > 0 ? (
        <div className={cx("project-box__star")}>
          {project.starCount}
          <BsFillStarFill size={10} />
        </div>
      ) : null}

      <div className={cx("project-box__thumbnail")} style={style}></div>
      <div className={cx("project-box__wrapper")}>
        <div className={cx("project-box__userPhoto")}>
          <img src={project?.user?.profilePhoto} alt="" />
        </div>
        <div className={cx("project-box__content")}>
          <h3 className={cx("project-box__content__title")}>
            {project?.title}
          </h3>
          <div className={cx("project-box__content__username")}>
            {project?.user?.username}
          </div>
        </div>
      </div>
    </Link>
  );
}

ProjectBox.propTypes = {};

export default ProjectBox;
