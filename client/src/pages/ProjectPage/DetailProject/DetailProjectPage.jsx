import classnames from "classnames/bind";
import styles from "./DetailProjectPage.module.scss";

const cx = classnames.bind(styles);
import PropTypes from "prop-types";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getErrorMessage from "@/utils/getErrorMessage";
import projectAPI from "@/api/projectAPI";
import Loading from "@/components/Loading/Loading";

function DetailProjectPage(props) {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  const getProject = async (slug) => {
    try {
      const res = await projectAPI.getBySlug(slug);
      console.log(res.result);
      setProject(res?.result);
      window.scrollTo(0, 0);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (slug) {
      getProject(slug);
    }
  }, [slug]);
  return (
    <>
      <Header hasBg={true} />
      <div className={cx("detail-project-container", "container")}>
        {project ? (
          <>
            <img src={project.thumbnail} alt="" />
            <div
              dangerouslySetInnerHTML={{ __html: project?.library?.content }}
              className={cx("detail-project-container__content")}
            />
          </>
        ) : (
          <Loading fullHeight />
        )}
      </div>
      <div className="container p-15">
        <div className="separate"></div>
      </div>
      <Footer />
    </>
  );
}

DetailProjectPage.propTypes = {};

export default DetailProjectPage;
