import classNames from "classnames/bind";
import styles from "./PopularSection.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";

import PopularTab from "./PopularTab";
import Grid from "@/components/Grid/Grid";
import UserBox from "@/components/UserBox/UserBox";
import ProjectBox from "@/components/ProjectBox/ProjectBox";
import { useLocation } from "react-router";
import queryString from "query-string";
import { useEffect, useState } from "react";

function PopularSection(props) {
  const [currentTab, setCurrentTab] = useState("project");
  const location = useLocation();

  useEffect(() => {
    const { tab } = queryString.parse(location.search);
    if (tab) {
      setCurrentTab(tab);
    }
  }, [location.search]);

  const users = [
    {
      username: "laptrinhvien",
      profilePhoto: "https://randomuser.me/api/portraits/men/49.jpg",
      firstName: "Lazarus",
      lastName: "Krix",
    },
    {
      username: "laptrinhvien2",
      profilePhoto: "https://randomuser.me/api/portraits/men/48.jpg",
      firstName: "Jimmie",
      lastName: "Simmmons",
    },
    {
      username: "laptrinhvien3",
      profilePhoto: "https://randomuser.me/api/portraits/women/6.jpg",
      firstName: "Tracy",
      lastName: "Hayes",
    },
    {
      username: "laptrinhvien",
      profilePhoto: "https://randomuser.me/api/portraits/men/79.jpg",
      firstName: "Marshall",
      lastName: "Peck",
    },
    {
      username: "laptrinhvien",
      profilePhoto: "https://randomuser.me/api/portraits/men/57.jpg",
      firstName: "Kyle",
      lastName: "Murphy",
    },
    {
      username: "laptrinhvien",
      profilePhoto: "https://randomuser.me/api/portraits/men/54.jpg",
      firstName: "Miguel",
      lastName: "Kim",
    },
    {
      username: "laptrinhvien",
      profilePhoto: "https://randomuser.me/api/portraits/men/49.jpg",
      firstName: "Lazarus",
      lastName: "Krix",
    },
    {
      username: "laptrinhvien2",
      profilePhoto: "https://randomuser.me/api/portraits/men/48.jpg",
      firstName: "Jimmie",
      lastName: "Simmmons",
    },
    {
      username: "laptrinhvien3",
      profilePhoto: "https://randomuser.me/api/portraits/women/6.jpg",
      firstName: "Tracy",
      lastName: "Hayes",
    },
    {
      username: "laptrinhvien",
      profilePhoto: "https://randomuser.me/api/portraits/men/79.jpg",
      firstName: "Marshall",
      lastName: "Peck",
    },
    {
      username: "laptrinhvien",
      profilePhoto: "https://randomuser.me/api/portraits/men/57.jpg",
      firstName: "Kyle",
      lastName: "Murphy",
    },
    {
      username: "laptrinhvien",
      profilePhoto: "https://randomuser.me/api/portraits/men/54.jpg",
      firstName: "Miguel",
      lastName: "Kim",
    },
    {
      username: "laptrinhvien",
      profilePhoto: "https://randomuser.me/api/portraits/men/49.jpg",
      firstName: "Lazarus",
      lastName: "Krix",
    },
    {
      username: "laptrinhvien2",
      profilePhoto: "https://randomuser.me/api/portraits/men/48.jpg",
      firstName: "Jimmie",
      lastName: "Simmmons",
    },
    {
      username: "laptrinhvien3",
      profilePhoto: "https://randomuser.me/api/portraits/women/6.jpg",
      firstName: "Tracy",
      lastName: "Hayes",
    },
    {
      username: "laptrinhvien",
      profilePhoto: "https://randomuser.me/api/portraits/men/79.jpg",
      firstName: "Marshall",
      lastName: "Peck",
    },
    {
      username: "laptrinhvien",
      profilePhoto: "https://randomuser.me/api/portraits/men/57.jpg",
      firstName: "Kyle",
      lastName: "Murphy",
    },
    {
      username: "laptrinhvien",
      profilePhoto: "https://randomuser.me/api/portraits/men/54.jpg",
      firstName: "Miguel",
      lastName: "Kim",
    },
  ];

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

        {renderTab(currentTab)}
      </div>
    </div>
  );
}

PopularSection.propTypes = {};

export default PopularSection;
