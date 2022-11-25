import projectAPI from "api/projectAPI";
import classNames from "classnames/bind";
import Loading from "components/Loading/Loading";
import ProjectBox from "components/ProjectBox/ProjectBox";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import getErrorMessage from "utils/getErrorMessage";
import styles from "./NewProjectSection.module.scss";

const cx = classNames.bind(styles);

function NewProjectSection(props) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getNewestProjects = async () => {
      try {
        const res = await projectAPI.newest();
        setProjects(res.result);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    };

    getNewestProjects();
    setLoading(false);
  }, []);

  return (
    <div className={cx("container wide section", "new-project-container")}>
      <div className={cx("new-project-header")}>
        Start collecting with
        <div className={cx("new-project-gradient", "gradient")}>
          Newest Project
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Swiper
          className={cx("mySwiper")}
          grabCursor={true}
          spaceBetween={30}
          slidesPerView={3}
          pagination={{
            clickable: true,
          }}
        >
          {projects.map((project, index) => (
            <SwiperSlide className={cx("swiper-slide")} key={index}>
              <ProjectBox project={project} maxHeight={true} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

NewProjectSection.propTypes = {};

export default NewProjectSection;
