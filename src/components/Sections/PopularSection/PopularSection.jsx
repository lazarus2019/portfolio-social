import projectAPI from "api/projectAPI";
import userAPI from "api/userAPI";
import classNames from "classnames/bind";
import Grid from "components/Grid/Grid";
import Loading from "components/Loading/Loading";
import ProjectBox from "components/ProjectBox/ProjectBox";
import UserBox from "components/UserBox/UserBox";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import getErrorMessage from "utils/getErrorMessage";
import styles from "./PopularSection.module.scss";
import PopularTab from "./PopularTab";
const cx = classNames.bind(styles);

function PopularSection(props) {
  const [currentTab, setCurrentTab] = useState("project");
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { tab } = queryString.parse(location.search);
    if (tab) {
      setCurrentTab(tab);
    }
  }, [location.search]);

  useEffect(() => {
    setLoading(true);
    const getPopularProjects = async () => {
      try {
        const res = await projectAPI.popular();
        setProjects(res.result);
        setLoading(false);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    };
    getPopularProjects();

    const getPopularUsers = async () => {
      try {
        const res = await userAPI.popular();
        console.log(res);
        setUsers(res.result);
        setLoading(false);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    };
    getPopularUsers();
  }, []);

  const renderTab = (tab) => {
    switch (tab) {
      case "project":
        return (
          <div className={cx("popular-project-list")}>
            <Grid col={2} gap={30}>
              {projects.map((project, index) => (
                <ProjectBox project={project} key={index} />
              ))}
            </Grid>
          </div>
        );

      case "user":
        return (
          <div className={cx("popular-user-list")}>
            <Grid col={3} gap={20}>
              {users.map((user, index) => (
                <UserBox
                  user={user}
                  key={index}
                  isTop={index < 10 ? true : false}
                />
              ))}
            </Grid>
          </div>
        );
      case "webauthor":
        return <div>Author</div>;
    }
  };

  return (
    <div className={cx("section")}>
      <PopularTab currentTab={currentTab} />
      <div className={cx("popular-container", "container", "wide")}>
        <div className={cx("popular-container__header")}>
          Give your code a home in the cloud
        </div>

        {loading ? <Loading color="#fff" /> : renderTab(currentTab)}
      </div>
    </div>
  );
}

PopularSection.propTypes = {};

export default PopularSection;
