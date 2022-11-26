import projectAPI from "api/projectAPI";
import userAPI from "api/userAPI";
import classnames from "classnames/bind";
import ProjectContent from "components/DetailProject/ProjectContent";
import ProjectSidebar from "components/DetailProject/ProjectSidebar";
import Footer from "components/Footer/Footer";
import Grid from "components/Grid/Grid";
import Header from "components/Header/Header";
import Loading from "components/Loading/Loading";
import NotFound from "components/NotFound/NotFound";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { setUser } from "redux/slices/userSlice";
import copyToClipboard from "utils/copyToClipboard";
import getErrorMessage from "utils/getErrorMessage";
import styles from "./DetailProjectPage.module.scss";

const cx = classnames.bind(styles);

function DetailProjectPage(props) {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setSaved] = useState(false);
  // const inputClipboardRef = useRef(null);

  const currentUser = useSelector((store) => store?.user?.value);

  useEffect(() => {
    setLoading(true);
    const getProject = async (slug) => {
      try {
        const res = await projectAPI.getBySlug(slug);
        setProject(res?.result);
        window.scrollTo(0, 0);
        if (currentUser) {
          const checkSave =
            currentUser.savedProject.indexOf(res.result.id) >= 0;
          setSaved(checkSave);
        }
      } catch (error) {
        toast.error(getErrorMessage(error));
        return <NotFound desc="Project Not Found" />;
      }
      setLoading(false);
    };
    if (slug) {
      getProject(slug);
    } else {
      setLoading(false);
      return <NotFound desc="Project Not Found" />;
    }
  }, [slug]);

  const handleFollow = async () => {
    try {
      if (
        currentUser &&
        currentUser?.following?.indexOf(project.user.id) >= 0
      ) {
        toast.error("You already follow this user");
      } else {
        const res = await userAPI.follow({ followId: project?.user?.id });
        if (res?.status) {
          const temp = { ...currentUser };
          temp.following = res?.result?.following;
          dispatch(setUser(temp));
          toast.success("Follow success");
        }
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleSavingProject = async () => {
    try {
      const res = await projectAPI.saving({ projectId: project.id });
      if (res.status) {
        const temp = { ...currentUser };
        temp.savedProject = res.savedProject;
        dispatch(setUser(temp));
        setSaved(!isSaved);
        toast.success(`${!isSaved ? "Saved" : "Unsaved"}`);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleGetShareLink = () => {
    // Another way
    // inputClipboardRef.current.classList.remove("hide-clipboard");
    // inputClipboardRef.current.value = window.location.href;
    // inputClipboardRef.current?.select();
    // document.execCommand("copy");
    // toast.success("Link copied to clipboard!");
    // inputClipboardRef.current.value = "";
    // inputClipboardRef.current.classList.add("hide-clipboard");

    copyToClipboard(window.location.href);
  };

  return (
    <>
      <Header hasBg={true} />
      <div className={cx("detail-project-container", "container")}>
        {loading ? (
          <Loading fullHeight />
        ) : (
          <Grid col={4} gap={30}>
            <ProjectContent
              project={project}
              onGetShareLink={handleGetShareLink}
              onSaving={handleSavingProject}
              onFollow={handleFollow}
              isSaved={isSaved}
            />
            <div className={cx("project-sidebar")}>
              <ProjectSidebar
                userId={project?.user?._id}
                userFullName={project?.user?.fullName}
              />
            </div>
          </Grid>
        )}
      </div>
      <div className="container p-15">
        <div className="separate"></div>
      </div>
      {/* Input element for copy to clipboard */}
      {/* <input
        ref={inputClipboardRef}
        className="hide-clipboard"
        type="text"
        readOnly
      /> */}
      <Footer />
      <a href="" target="_blank"></a>
    </>
  );
}

DetailProjectPage.propTypes = {};

export default DetailProjectPage;
