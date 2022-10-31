import projectAPI from "@/api/projectAPI";
import userAPI from "@/api/userAPI";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Loading from "@/components/Loading/Loading";
import NotFound from "@/components/NotFound/NotFound";
import ProfileTab from "@/components/ProfileTab/ProfileTab";
import ProjectBoxProfileList from "@/components/ProjectBoxProfile/ProjectBoxProfileList";
import UserBoxProfileList from "@/components/UserBoxProfile/UserBoxProfileList";
import UserProfile from "@/components/UserProfile/UserProfile";
import { setUser } from "@/redux/slices/userSlice";
import getErrorMessage from "@/utils/getErrorMessage";
import classNames from "classnames/bind";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);

function Profile(props) {
  // const { username } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const username = useMemo(() => {
    return location.pathname.split("/@")[1];
  }, [location.pathname]);
  const currentTab = useMemo(() => {
    return location.search.split("?tab=")[1] || "project";
  }, [location.search]);

  const currentUser = useSelector((store) => store?.user?.value);

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const getProfile = async () => {
    try {
      const res = await userAPI.profile(username);
      setProfile(res.user);
      window.scrollTo(0, 0);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const getProjects = async () => {
    try {
      if (username === currentUser?.username) {
        const res = await projectAPI.getOwnProjects();
        setProjects(res.result);
      } else {
        const res = await projectAPI.getByUsername(username);
        setProjects(res.result);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const getFollowing = async () => {
    try {
      const res = await userAPI.following(username);
      if (res) {
        setFollowing(res.listFollowing);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const getFollowers = async () => {
    try {
      const res = await userAPI.followers(username);
      if (res) {
        setFollowers(res.listFollowers);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const getData = async (tab) => {
    switch (tab) {
      case "project":
        await getProjects();
        break;
      case "following":
        await getFollowing();
        break;
      case "followers":
        await getFollowers();
        break;
      default:
        await getProjects();
    }
  };

  const renderTab = (tab) => {
    switch (tab) {
      case "project":
        return (
          <ProjectBoxProfileList
            projects={projects}
            projectCount={profile?.info?.projectCount}
            currentUser={currentUser}
            onSaving={handleSavingProject}
            emptyContent="No Posts Yet!"
            isCurrentUser={
              currentUser ? currentUser?.id === profile?.id : false
            }
          />
        );
      case "following":
        return (
          <UserBoxProfileList
            users={following}
            currentUser={currentUser}
            onFollowing={handleFollowing}
            emptyContent="Don’t have any followings yet."
          />
        );
      case "followers":
        return (
          <UserBoxProfileList
            users={followers}
            currentUser={currentUser}
            onFollowing={handleFollowing}
            emptyContent="Don’t have any followers yet."
          />
        );
      default:
        return (
          <ProjectBoxProfileList
            projects={projects}
            projectCount={profile?.info?.projectCount}
            currentUser={currentUser}
            onSaving={handleSavingProject}
            emptyContent="No Posts Yet!"
            isCurrentUser={
              currentUser ? currentUser?.id === profile?.id : false
            }
          />
        );
    }
  };

  useLayoutEffect(() => {
    if (username) {
      getProfile();
      getData(currentTab);
    }

    setLoading(false);
  }, [username, dispatch]);

  useEffect(() => {
    getData(currentTab);
    window.scrollTo(0, 0);
  }, [currentTab]);

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
        getProjects();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
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
            currentTab={currentTab}
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
            <div className={cx("right-content")}>{renderTab(currentTab)}</div>
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
