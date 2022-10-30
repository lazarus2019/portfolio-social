import projectAPI from "@/api/projectAPI";
import userAPI from "@/api/userAPI";
import Empty from "@/components/Empty/Empty";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Loading from "@/components/Loading/Loading";
import NotFound from "@/components/NotFound/NotFound";
import Pagination from "@/components/Pagination/Pagination";
import ProfileTab from "@/components/ProfileTab/ProfileTab";
import ProjectBoxProfile from "@/components/ProjectBoxProfile/ProjectBoxProfile";
import SearchProject from "@/components/Search/SearchProfile/SearchProject";
import UserBoxProfile from "@/components/UserBoxProfile/UserBoxProfile";
import UserProfile from "@/components/UserProfile/UserProfile";
import { setUser } from "@/redux/slices/userSlice";
import getErrorMessage from "@/utils/getErrorMessage";
import classNames from "classnames/bind";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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
  }, [location]);

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
      getProjects();
      getFollowing();
      getFollowers();
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

  useLayoutEffect(() => {
    if (username) {
      getProfile();
    }

    setLoading(false);
  }, [username, dispatch]);

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
              {followers && followers.length > 0 ? (
                followers?.map((user) => (
                  <UserBoxProfile
                    key={user?.id}
                    user={user}
                    onFollowing={handleFollowing}
                    isCurrentUser={user.id === currentUser?.id}
                    isFollowing={
                      currentUser &&
                      user.followers.indexOf(currentUser?.id) >= 0
                    }
                  />
                ))
              ) : (
                <Empty desc="Don’t have any followers yet." />
              )}

              {following && following?.length > 0 ? (
                following?.map((user) => (
                  <UserBoxProfile
                    key={user?.id}
                    user={user}
                    onFollowing={handleFollowing}
                    isFollowing={
                      currentUser &&
                      user.followers.indexOf(currentUser?.id) >= 0
                    }
                  />
                ))
              ) : (
                <Empty desc="Don’t have any followings yet." />
              )}

              {profile?.info?.projectCount > 0 ? (
                <>
                  <SearchProject
                    isCurrentUser={
                      currentUser ? currentUser?.id === profile?.id : false
                    }
                  />
                  {projects?.map((project, index) => (
                    <ProjectBoxProfile
                      project={project}
                      key={index}
                      isStared={
                        currentUser &&
                        currentUser?.savedProject?.indexOf(project?.id) >= 0
                      }
                      onSaving={handleSavingProject}
                    />
                  ))}

                  <Pagination />
                </>
              ) : (
                <Empty desc="Not Posts Yet" />
              )}
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
