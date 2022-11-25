import projectAPI from "api/projectAPI";
import classnames from "classnames/bind";
import Loading from "components/Loading/Loading";
import ProjectBox from "components/ProjectBox/ProjectBox";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getErrorMessage from "utils/getErrorMessage";
import styles from "./DetailProject.module.scss";

const cx = classnames.bind(styles);

function ProjectSidebar(props) {
  const { userId, userFullName } = props;
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecentProjects = async () => {
      try {
        const res = await projectAPI.newest();
        setProjects(res.result.slice(0, 4));
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    };

    if (userId) {
      getRecentProjects();
    }

    setLoading(false);
  }, [userId]);

  return (
    <div className={cx("project-sidebar")}>
      <h3 className={cx("project-sidebar__heading")}>
        {userFullName}'s Recent Projects
      </h3>
      <div className="separate"></div>
      {loading ? (
        <Loading />
      ) : (
        <div className={cx("project-sidebar__list")}>
          {projects?.length > 0
            ? projects.map((project) => (
                <ProjectBox project={project} small={true} />
              ))
            : null}
        </div>
      )}

      <h3 className={cx("project-sidebar__heading")}>Popular Projects</h3>
      <div className="separate"></div>
      {loading ? (
        <Loading />
      ) : (
        <div className={cx("project-sidebar__list")}>
          {projects?.length > 0
            ? projects.map((project) => (
                <ProjectBox project={project} small={true} />
              ))
            : null}
        </div>
      )}
    </div>
  );
}

ProjectSidebar.propTypes = {};

export default ProjectSidebar;
