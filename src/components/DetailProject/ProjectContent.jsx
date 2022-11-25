import classnames from "classnames/bind";
import {
  BsChevronDoubleRight
} from "react-icons/bs";
import styles from "./DetailProject.module.scss";
import ProjectAuthor from "./ProjectAuthor";

const cx = classnames.bind(styles);

function ProjectContent(props) {
  const {
    project,
    onGetShareLink,
    onSaving,
    onFollow,
    isSaved = false,
  } = props;

  const handleFollow = () => {
    if (!onFollow) return;
    onFollow();
  };

  return (
    <div className={cx("project-content")}>
      <div
        className={cx("project-content__thumbnail")}
        style={{ backgroundImage: `url(${project.thumbnail})` }}
      >
        <div className={cx("project-content__thumbnail__title")}>
          {project.title}
        </div>
      </div>

      <ProjectAuthor
        project={project}
        isSaved={isSaved}
        onGetShareLink={onGetShareLink}
        onSaving={onSaving}
      />

      <div className={cx("project-content__short-desc")}>
        {project.shortDescription}
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: project?.library?.content?.replace(
            /href/g,
            "target='_blank' href"
          ),
        }}
        className={cx("project-content__content")}
      />
      <span className={cx("project-content__follow")} onClick={handleFollow}>
        <BsChevronDoubleRight size={15} />
        Follow {project.user.fullName} for more
      </span>
    </div>
  );
}

ProjectContent.propTypes = {};

export default ProjectContent;
