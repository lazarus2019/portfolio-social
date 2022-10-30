import classNames from "classnames/bind";
import styles from "./ProjectBoxProfile.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BsStar, BsFillStarFill } from "react-icons/bs";
import { fromNowDateFormatter } from "@/utils/DateFormatter";
import SearchProject from "../Search/SearchProfile/SearchProject";
import Pagination from "../Pagination/Pagination";
import Empty from "../Empty/Empty";

function ProjectBoxProfileList(props) {
  const {
    projects,
    projectCount = 0,
    currentUser = null,
    onSaving = () => {},
    emptyContent = "Don't have content yet!",
    isCurrentUser = false,
  } = props;
  return (
    <>
      {projectCount > 0 ? (
        <>
          <SearchProject isCurrentUser={isCurrentUser} />
          {projects?.map((project, index) => (
            <ProjectBoxProfileItem
              key={index}
              project={project}
              isStared={
                currentUser &&
                currentUser?.savedProject?.indexOf(project?.id) >= 0
              }
              onSaving={onSaving}
            />
          ))}

          <Pagination />
        </>
      ) : (
        <Empty desc={emptyContent} />
      )}
    </>
  );
}

function ProjectBoxProfileItem(props) {
  const { project, isStared, onSaving } = props;
  const handleSaving = () => {
    if (!onSaving) return;
    onSaving(project?.id);
  };
  return (
    <div className={cx("project-container")}>
      <Link
        to={`/project/${project?.slug}`}
        className={cx("project-container__thumbnail")}
      >
        <img src={project?.thumbnail} alt="" />
      </Link>
      <div className={cx("project-box")}>
        <div className={cx("project-box__content")}>
          <div className={cx("project-box__left")}>
            <Link
              to={`/project/${project?.slug}`}
              className={cx("project-box__title")}
            >
              {project?.title}
            </Link>
            <div className={cx("project-box__status")}>
              {project?.isHide ? "Private" : "Public"}
            </div>
            <p className={cx("project-box__desc")}>
              {project.shortDescription}
            </p>
            <div className={cx("project-box__tags")}>
              <div className={cx("project-box__tags__item")}>HTML</div>
              <div className={cx("project-box__tags__item")}>CSS</div>
              <div className={cx("project-box__tags__item")}>Javascript</div>
              <div className={cx("project-box__tags__item")}>ReactJS</div>
              <div className={cx("project-box__tags__item")}>NodeJS</div>
            </div>
            <div className={cx("project-box__created-date")}>
              {fromNowDateFormatter(project?.createdAt)}
            </div>
          </div>
          <div className={cx("project-box__right")}>
            <div className={cx("project-box__star")}>
              <button
                onClick={handleSaving}
                className={cx("project-box__star__btn", "stared")}
              >
                {isStared ? (
                  <>
                    <BsFillStarFill size={14} /> <span>Starred</span>
                  </>
                ) : (
                  <>
                    <BsStar size={14} /> <span>Star</span>
                  </>
                )}
              </button>
              <div className={cx("project-box__star__count")}>
                {project.starCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProjectBoxProfileList.propTypes = {};

export default ProjectBoxProfileList;