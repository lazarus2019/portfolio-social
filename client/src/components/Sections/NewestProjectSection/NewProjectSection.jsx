import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";

import classNames from "classnames/bind";
import styles from "./NewProjectSection.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import ProjectBox from "@/components/ProjectBox/ProjectBox";
const cx = classNames.bind(styles);

function NewProjectSection(props) {
  const projects = [
    {
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      slug: "passport-local-jwt-11302",
      title: "passport local jwt",
      user: {
        username: "laptrinhvien",
        profilePhoto:
          "https://res.cloudinary.com/amazona-app/image/upload/v1665804263/blank_profile_znhwkp.png",
      },
    },
    {
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      slug: "passport-local-jwt-11302",
      title: "passport local jwt",
      user: {
        username: "laptrinhvien",
        profilePhoto:
          "https://res.cloudinary.com/amazona-app/image/upload/v1665804263/blank_profile_znhwkp.png",
      },
    },
    {
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      slug: "passport-local-jwt-11302",
      title: "passport local jwt",
      user: {
        username: "laptrinhvien",
        profilePhoto:
          "https://res.cloudinary.com/amazona-app/image/upload/v1665804263/blank_profile_znhwkp.png",
      },
    },
    {
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      slug: "passport-local-jwt-11302",
      title: "Create a slug and add a slug to mongoose schema",
      user: {
        username: "laptrinhvien",
        profilePhoto:
          "https://res.cloudinary.com/amazona-app/image/upload/v1665804263/blank_profile_znhwkp.png",
      },
    },
    {
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      slug: "passport-local-jwt-11302",
      title: "JWT.IO allows you to decode, verify and generate JWT",
      user: {
        username: "laptrinhvien",
        profilePhoto:
          "https://res.cloudinary.com/amazona-app/image/upload/v1665804263/blank_profile_znhwkp.png",
      },
    },
  ];
  return (
    <div className={cx("container wide section", "new-project-container")}>
      <div className={cx("new-project-header")}>
        Start collecting with
        <div className={cx("new-project-gradient", "gradient")}>
          Newest Project
        </div>
      </div>
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
    </div>
  );
}

NewProjectSection.propTypes = {};

export default NewProjectSection;
