import classnames from "classnames/bind";
import styles from "./DetailProjectPage.module.scss";

const cx = classnames.bind(styles);
import PropTypes from "prop-types";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import getErrorMessage from "@/utils/getErrorMessage";
import projectAPI from "@/api/projectAPI";
import Loading from "@/components/Loading/Loading";
import { Link } from "react-router-dom";
import dateFormatter, { fromNowDateFormatter } from "@/utils/dateFormatter";
import {
  BsFillBookmarkStarFill,
  BsThreeDots,
  BsChevronDoubleRight,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import Grid from "@/components/Grid/Grid";
import NotFound from "@/components/NotFound/NotFound";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import copyToClipboard from "@/utils/copyToClipboard";
import userAPI from "@/api/userAPI";

function DetailProjectPage(props) {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [isSaved, setSaved] = useState(false);
  // const inputClipboardRef = useRef(null);

  const currentUser = useSelector((store) => store?.user?.value);

  const getProject = async (slug) => {
    try {
      const res = await projectAPI.getBySlug(slug);
      console.log(res.result);
      setProject(res?.result);
      window.scrollTo(0, 0);
      if (currentUser) {
        const checkSave = currentUser.savedProject.indexOf(res.result.id) >= 0;
        setSaved(checkSave);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    setLoading(true);
    if (slug) {
      getProject(slug);
    }
    setLoading(false);
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
          toast.success("Follow success")
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
        ) : project ? (
          <Grid col={3} gap={30}>
            <div className={cx("project-detail")}>
              <div
                className={cx("project-detail__thumbnail")}
                style={{ backgroundImage: `url(${project.thumbnail})` }}
              >
                <div className={cx("project-detail__thumbnail__title")}>
                  {project.title}
                </div>
              </div>
              <div
                className={cx(
                  "project-detail__header",
                  "flex",
                  "space-between",
                  "y-center"
                )}
              >
                <div className={cx("project-detail__header__author")}>
                  <Link
                    to={`/@${project.user.username}`}
                    className={cx("project-detail__header__author__photo")}
                  >
                    <img src={project.user.profilePhoto} alt="" />
                  </Link>
                  <div className={cx("project-detail__header__author__info")}>
                    <Link
                      to={`/@${project.user.username}`}
                      className={cx(
                        "project-detail__header__author__info__username"
                      )}
                    >
                      {project.user.fullName}
                    </Link>
                    <p
                      className={cx(
                        "project-detail__header__author__info__date"
                      )}
                    >
                      {dateFormatter(project?.createdAt)}
                    </p>
                    <p
                      className={cx(
                        "project-detail__header__author__info__date"
                      )}
                    >
                      Updated at {fromNowDateFormatter(project?.updatedAt)}
                    </p>
                  </div>
                </div>
                <div className={cx("project-detail__header__options")}>
                  <span
                    className={cx(`${isSaved ? "active" : ""}`)}
                    onClick={handleSavingProject}
                  >
                    <BsFillBookmarkStarFill size={20} />
                  </span>
                  <span onClick={handleGetShareLink}>
                    <BsThreeDots size={20} />
                  </span>
                </div>
              </div>
              <div className={cx("project-detail__short-desc")}>
                {project.shortDescription}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: project?.library?.content?.replace(
                    /href/g,
                    "target='_blank' href"
                  ),
                }}
                className={cx("project-detail__content")}
              />
              <span
                className={cx("project-detail__follow")}
                onClick={handleFollow}
              >
                <BsChevronDoubleRight size={15} />
                Follow {project.user.fullName} for more
              </span>
            </div>
            <div className={cx("project-sidebar")}></div>
          </Grid>
        ) : (
          <NotFound desc="Project Not Found" />
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
