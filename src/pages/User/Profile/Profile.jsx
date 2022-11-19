import projectAPI from "api/projectAPI";
import userAPI from "api/userAPI";
import classNames from "classnames/bind";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import Loading from "components/Loading/Loading";
import NotFound from "components/NotFound/NotFound";
import ProfileTab from "components/ProfileTab/ProfileTab";
import ProjectBoxProfileList from "components/ProjectBoxProfile/ProjectBoxProfileList";
import UserBoxProfileList from "components/UserBoxProfile/UserBoxProfileList";
import UserProfile from "components/UserProfile/UserProfile";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { setUser } from "redux/slices/userSlice";
import getErrorMessage from "utils/getErrorMessage";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);

function Profile(props) {
  // const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const username = useMemo(() => {
    return location.pathname.split("/@")[1];
  }, [location.pathname]);

  const currentUser = useSelector((store) => store?.user?.value);

  const [loading, setLoading] = useState(true);
  const [loadingTab, setLoadingTab] = useState(true);
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [savedProjects, setSavedProjects] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(1);

  const searchQueryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      tab: params.tab || "project",
      q: params.q || undefined,
      sort: params.sort || undefined,
      page: params.page || undefined,
      type: params.type || undefined,
    };
  }, [location.search]);

  const getProfile = async () => {
    try {
      const res = await userAPI.profile(username);
      setProfile(res.user);
      window.scrollTo(0, 0);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const getProjects = async (queryParams) => {
    try {
      if (username === currentUser?.username) {
        const res = await projectAPI.getOwnProjects(queryParams);
        setProjects(res.results);
        setTotalRows(res.totalRows);
      } else {
        const res = await projectAPI.getByUsername(username, queryParams);
        setProjects(res.results);
        setTotalRows(res.totalRows);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const getSavedProjects = async (queryParams) => {
    try {
      if (username === currentUser?.username) {
        const res = await projectAPI.getSavedProjects(queryParams);
        setSavedProjects(res.results);
        setTotalRows(res.totalRows);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const getFollowing = async (queryParams) => {
    try {
      const res = await userAPI.following(username, queryParams);
      if (res) {
        setFollowing(res.results);
        setTotalRows(res.totalRows);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const getFollowers = async (queryParams) => {
    try {
      const res = await userAPI.followers(username, queryParams);
      if (res) {
        setFollowers(res.results);
        setTotalRows(res.totalRows);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const getData = async (queryParams) => {
    setLoadingTab(true);
    switch (searchQueryParams.tab) {
      case "project":
        await getProjects(queryParams);
        break;
      case "star":
        await getSavedProjects(queryParams);
        break;
      case "following":
        await getFollowing(queryParams);
        break;
      case "followers":
        await getFollowers(queryParams);
        break;
      default:
        await getProjects(queryParams);
    }
    setLoadingTab(false);
  };

  const renderTab = (tab) => {
    switch (tab) {
      case "project":
        return (
          <ProjectBoxProfileList
            loading={loadingTab}
            projects={projects}
            currentUser={currentUser}
            onSaving={handleSavingProject}
            onToggleHide={handleToggleHide}
            onPageChange={handlePageChange}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            onClearFilter={handleClearFilter}
            searchQueryParams={searchQueryParams}
            totalRows={totalRows}
            currentPage={currentPage}
            emptyContent="No Posts Yet!"
            isCurrentUser={
              currentUser ? currentUser?.id === profile?.id : false
            }
          />
        );
      case "star":
        return (
          <ProjectBoxProfileList
            loading={loadingTab}
            projects={savedProjects}
            currentUser={currentUser}
            onSaving={handleSavingProject}
            onToggleHide={handleToggleHide}
            onPageChange={handlePageChange}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            onClearFilter={handleClearFilter}
            searchQueryParams={searchQueryParams}
            totalRows={totalRows}
            currentPage={currentPage}
            emptyContent="No Posts Yet!"
          />
        );
      case "following":
        return (
          <UserBoxProfileList
            loading={loadingTab}
            users={following}
            currentUser={currentUser}
            onFollowing={handleFollowing}
            onPageChange={handlePageChange}
            onFilterChange={handleFilterChange}
            onClearFilter={handleClearFilter}
            onSearchChange={handleSearchChange}
            searchQueryParams={searchQueryParams}
            totalRows={totalRows}
            currentPage={currentPage}
            emptyContent="Don’t have any followings yet."
          />
        );
      case "followers":
        return (
          <UserBoxProfileList
            loading={loadingTab}
            users={followers}
            currentUser={currentUser}
            onFollowing={handleFollowing}
            onPageChange={handlePageChange}
            onFilterChange={handleFilterChange}
            onClearFilter={handleClearFilter}
            onSearchChange={handleSearchChange}
            searchQueryParams={searchQueryParams}
            totalRows={totalRows}
            currentPage={currentPage}
            emptyContent="Don’t have any followers yet."
          />
        );
      default:
        return (
          <ProjectBoxProfileList
            loading={loadingTab}
            projects={projects}
            currentUser={currentUser}
            onSaving={handleSavingProject}
            onToggleHide={handleToggleHide}
            onPageChange={handlePageChange}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            onClearFilter={handleClearFilter}
            searchQueryParams={searchQueryParams}
            totalRows={totalRows}
            currentPage={currentPage}
            emptyContent="No Posts Yet!"
            isCurrentUser={
              currentUser ? currentUser?.id === profile?.id : false
            }
          />
        );
    }
  };

  useEffect(() => {
    const getUserProfile = async () => {
      await getProfile();
      getData();
    };

    if (username) {
      getUserProfile();
    }

    setLoading(false);
  }, [username, dispatch]);

  useEffect(() => {
    if (searchQueryParams?.page) {
      console.log("params changed");
      getData(`?${queryString.stringify(searchQueryParams)}`);
      setCurrentPage(+searchQueryParams?.page);
    } else {
      console.log("tab changed");
      getData();
      setCurrentPage(1);
    }
    window.scrollTo(0, 0);
  }, [
    searchQueryParams.tab,
    searchQueryParams.page,
    searchQueryParams.sort,
    searchQueryParams.q,
    searchQueryParams.type,
  ]);

  const handleFollowing = async (followId, isFollowProfile = false) => {
    try {
      const res = await userAPI.follow({ followId });
      if (res?.status) {
        if (isFollowProfile) {
          setProfile((prev) => ({
            ...prev,
            info: {
              ...prev.info,
              followers: res?.result?.followers,
            },
          }));
          if (currentUser.id === profile?.id) {
            const temp = { ...currentUser };
            temp.following = res?.result?.following;
            dispatch(setUser(temp));
          }
        } else {
          if (currentUser.id === profile?.id) {
            setProfile((prev) => ({
              ...prev,
              info: {
                ...prev.info,
                following: res?.result?.following,
              },
            }));
          }
          getFollowing();
          getFollowers();
        }
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleSavingProject = async (projectId) => {
    try {
      const res = await projectAPI.saving({ projectId });
      if (res.status) {
        const temp = { ...currentUser };
        temp.savedProject = res.savedProject;
        dispatch(setUser(temp));
        if (currentUser.id === profile?.id) {
          setProfile((prev) => ({
            ...prev,
            info: {
              ...prev.info,
              savedProject: res.savedProject,
            },
          }));
        }
        if (searchQueryParams.tab === "star") {
          getSavedProjects(`?${queryString.stringify(searchQueryParams)}`);
        } else {
          getProjects(`?${queryString.stringify(searchQueryParams)}`);
        }
        // Replace get project by change value to save or not save
      }
    } catch (error) {
      console.log({ error });
      toast.error(getErrorMessage(error));
    }
  };

  const handleToggleHide = async (projectId) => {
    try {
      const res = await projectAPI.hide({
        projectId: projectId,
      });
      if (res.status) {
        // Toggle hide of project
        const temp = [...projects];
        const newProjectList = temp.map((project) => {
          if (project.id === projectId) {
            return { ...project, isHide: !project.isHide };
          }
          return project;
        });
        setProjects(newProjectList);
        toast.success("Your change had saved!");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const newFilter = { ...searchQueryParams, page: page };

    navigate(`?${queryString.stringify(newFilter)}`);
    window.scrollTo(0, 0);
  };

  // Filter Project
  const handleFilterChange = (filter) => {
    const newFilter = { ...searchQueryParams, ...filter, page: 1 };

    navigate(`?${queryString.stringify(newFilter)}`);
    window.scrollTo(0, 0);
  };

  // Search Project, Follower & following
  const handleSearchChange = (keyword) => {
    let newFilter = { ...searchQueryParams };
    console.log({ keyword });
    if (keyword) {
      if (keyword !== "") {
        newFilter = { ...searchQueryParams, q: keyword, page: 1 };
      } else {
        newFilter = { ...searchQueryParams, q: undefined, page: undefined };
      }
      navigate(`?${queryString.stringify(newFilter)}`);
      window.scrollTo(0, 0);
    } else {
      // Check first time and set q = ""
      // newFilter = { ...searchQueryParams, q: "", page: undefined };
    }
  };

  // Clear filter & search query
  const handleClearFilter = () => {
    const newFilter = {
      ...searchQueryParams,
      q: undefined,
      sort: undefined,
      page: undefined,
      type: undefined,
    };
    navigate(`?${queryString.stringify(newFilter)}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header hasBg={true} />
      {loading ? (
        <Loading fullHeight />
      ) : profile ? (
        <>
          <ProfileTab
            user={profile}
            isCurrentUser={currentUser && currentUser?.id === profile?.id}
            isFollowing={
              currentUser &&
              profile?.info?.followers.indexOf(currentUser?.id) >= 0
            }
            onFollowing={handleFollowing}
            currentTab={searchQueryParams?.tab}
          />
          <div className={cx("container", "profile-container")}>
            <div className={cx("left-content")}>
              <UserProfile
                user={profile}
                isCurrentUser={currentUser && currentUser?.id === profile?.id}
                isFollowing={
                  currentUser &&
                  profile?.info?.followers.indexOf(currentUser?.id) >= 0
                }
                onFollowing={handleFollowing}
              />
            </div>
            <div className={cx("right-content")}>
              {renderTab(searchQueryParams?.tab)}
            </div>
          </div>
        </>
      ) : (
        <NotFound desc="User not found" />
      )}
      <div className={cx("container", "profile-bottom")}>
        <div className="separate"></div>
      </div>
      <Footer />
    </>
  );
}

Profile.propTypes = {};

export default Profile;
