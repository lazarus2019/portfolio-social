import classNames from "classnames/bind";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import Header from "@/components/Header/Header";
import UserProfile from "@/components/UserProfile/UserProfile";
import ProfileTab from "@/components/ProfileTab/ProfileTab";
import Grid from "@/components/Grid/Grid";
import ProjectBoxProfile from "@/components/ProjectBoxProfile/ProjectBoxProfile";
import Footer from "@/components/Footer/Footer";

import Pagination from "@/components/Pagination/Pagination";
import SearchProject from "@/components/Search/SearchProfile/SearchProject";

function Profile(props) {
  const user = {
    info: {
      projectCount: 0,
      externalLinks: [
        {
          title: "Github",
          url: "https://github.com/lazarus2019",
        },
      ],
      bio: "No description, website, or topics provided.",
      followers: [],
    },
    setting: {
      isPrivateAccount: false,
    },
    _id: "634e643f1789a662fec7681d",
    firstName: "Post",
    lastName: "Malone",
    profilePhoto:
      "https://res.cloudinary.com/amazona-app/image/upload/v1665804263/blank_profile_znhwkp.png",
    username: "tommy087",
    isBan: false,
    createdAt: "2022-10-18T08:30:55.427Z",
    updatedAt: "2022-10-21T02:38:44.693Z",
    __v: 0,
    id: "634e643f1789a662fec7681d",
  };
  const projects = [
    {
      library: {
        content: "",
        images: [],
      },
      _id: "63500ea148a6ca6ff63f625b",
      title: "passport local jwt",
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      tag: [],
      languages: [],
      shortDescription:
        "Create a simple NodeJS server for register & login by mongoDB, passport local & jwt",
      starCount: 6,
      isHide: false,
      createdAt: "2022-10-19T14:50:09.582Z",
      updatedAt: "2022-10-20T14:38:29.480Z",
      __v: 0,
      slug: "passport-local-jwt-11302",
      id: "63500ea148a6ca6ff63f625b",
    },
    {
      library: {
        content: "",
        images: [],
      },
      _id: "6350e555bf6ebe1307e1a5e3",
      title:
        "Create a slug and add a slug to mongoose schema Create a slug and add a slug to mongoose schema Create a slug and add a slug to mongoose schema Create a slug and add a slug to mongoose schema",
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      tag: [],
      languages: [],
      shortDescription:
        "Create a slug from a mongoose schema title (or any key really), store the slug in the title so you can use it to route route route",
      starCount: 12,
      isHide: true,
      createdAt: "2022-10-20T06:06:13.119Z",
      updatedAt: "2022-10-20T06:06:13.119Z",
      slug: "create-a-slug-and-add-a-slug-to-mongoose-schema",
      __v: 0,
      id: "6350e555bf6ebe1307e1a5e3",
    },
    {
      library: {
        content: "",
        images: [],
        previewVideo:
          "https://res.cloudinary.com/amazona-app/video/upload/v1666268645/x88x6wovlmgblspywcqs.mp4",
      },
      _id: "635126456507ae95e7889189",
      title: "JWT.IO allows you to decode, verify and generate JWT",
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      tag: [],
      languages: [],
      shortDescription:
        "JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.",
      starCount: 0,
      isHide: false,
      createdAt: "2022-10-20T10:43:17.919Z",
      updatedAt: "2022-10-20T12:24:15.915Z",
      slug: "jwtio-allows-you-to-decode-verify-and-generate-jwt-11097",
      __v: 0,
      id: "635126456507ae95e7889189",
    },
    {
      library: {
        content: "",
        images: [],
        previewVideo:
          "https://res.cloudinary.com/amazona-app/video/upload/v1666277388/n94qcjiwxe3vztnunqnj.mp4",
      },
      _id: "6351567433a58994112e82bc",
      title: "Create a slug and add a slug to mongoose schema",
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      tag: [],
      languages: [],
      shortDescription:
        "Create a slug from a mongoose schema title (or any key really), store the slug in the title so you can use it to route route route",
      starCount: 50,
      isHide: true,
      createdAt: "2022-10-20T14:08:52.565Z",
      updatedAt: "2022-10-20T14:49:48.974Z",
      slug: "create-a-slug-and-add-a-slug-to-mongoose-schema-28919",
      __v: 0,
      id: "6351567433a58994112e82bc",
    },
    {
      library: {
        content: "",
        images: [],
      },
      _id: "63500ea148a6ca6ff63f625b",
      title: "passport local jwt",
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      tag: [],
      languages: [],
      shortDescription:
        "Create a simple NodeJS server for register & login by mongoDB, passport local & jwt",
      starCount: 100,
      isHide: false,
      createdAt: "2022-10-19T14:50:09.582Z",
      updatedAt: "2022-10-20T14:38:29.480Z",
      __v: 0,
      slug: "passport-local-jwt-11302",
      id: "63500ea148a6ca6ff63f625b",
    },
    {
      library: {
        content: "",
        images: [],
      },
      _id: "6350e555bf6ebe1307e1a5e3",
      title: "Create a slug and add a slug to mongoose schema",
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      tag: [],
      languages: [],
      shortDescription:
        "Create a slug from a mongoose schema title (or any key really), store the slug in the title so you can use it to route route route",
      starCount: 80,
      isHide: true,
      createdAt: "2022-10-20T06:06:13.119Z",
      updatedAt: "2022-10-20T06:06:13.119Z",
      slug: "create-a-slug-and-add-a-slug-to-mongoose-schema",
      __v: 0,
      id: "6350e555bf6ebe1307e1a5e3",
    },
    {
      library: {
        content: "",
        images: [],
        previewVideo:
          "https://res.cloudinary.com/amazona-app/video/upload/v1666268645/x88x6wovlmgblspywcqs.mp4",
      },
      _id: "635126456507ae95e7889189",
      title: "JWT.IO allows you to decode, verify and generate JWT",
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      tag: [],
      languages: [],
      shortDescription:
        "JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.",
      starCount: 0,
      isHide: false,
      createdAt: "2022-10-20T10:43:17.919Z",
      updatedAt: "2022-10-20T12:24:15.915Z",
      slug: "jwtio-allows-you-to-decode-verify-and-generate-jwt-11097",
      __v: 0,
      id: "635126456507ae95e7889189",
    },
    {
      library: {
        content: "",
        images: [],
        previewVideo:
          "https://res.cloudinary.com/amazona-app/video/upload/v1666277388/n94qcjiwxe3vztnunqnj.mp4",
      },
      _id: "6351567433a58994112e82bc",
      title: "Create a slug and add a slug to mongoose schema",
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      tag: [],
      languages: [],
      shortDescription:
        "Create a slug from a mongoose schema title (or any key really), store the slug in the title so you can use it to route route route",
      starCount: 0,
      isHide: true,
      createdAt: "2022-10-20T14:08:52.565Z",
      updatedAt: "2022-10-20T14:49:48.974Z",
      slug: "create-a-slug-and-add-a-slug-to-mongoose-schema-28919",
      __v: 0,
      id: "6351567433a58994112e82bc",
    },
    {
      library: {
        content: "",
        images: [],
      },
      _id: "63500ea148a6ca6ff63f625b",
      title: "passport local jwt",
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      tag: [],
      languages: [],
      shortDescription:
        "Create a simple NodeJS server for register & login by mongoDB, passport local & jwt",
      starCount: 0,
      isHide: false,
      createdAt: "2022-10-19T14:50:09.582Z",
      updatedAt: "2022-10-20T14:38:29.480Z",
      __v: 0,
      slug: "passport-local-jwt-11302",
      id: "63500ea148a6ca6ff63f625b",
    },
    {
      library: {
        content: "",
        images: [],
      },
      _id: "6350e555bf6ebe1307e1a5e3",
      title: "Create a slug and add a slug to mongoose schema",
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      tag: [],
      languages: [],
      shortDescription:
        "Create a slug from a mongoose schema title (or any key really), store the slug in the title so you can use it to route route route",
      starCount: 0,
      isHide: true,
      createdAt: "2022-10-20T06:06:13.119Z",
      updatedAt: "2022-10-20T06:06:13.119Z",
      slug: "create-a-slug-and-add-a-slug-to-mongoose-schema",
      __v: 0,
      id: "6350e555bf6ebe1307e1a5e3",
    },
    {
      library: {
        content: "",
        images: [],
        previewVideo:
          "https://res.cloudinary.com/amazona-app/video/upload/v1666268645/x88x6wovlmgblspywcqs.mp4",
      },
      _id: "635126456507ae95e7889189",
      title: "JWT.IO allows you to decode, verify and generate JWT",
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      tag: [],
      languages: [],
      shortDescription:
        "JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.",
      starCount: 0,
      isHide: false,
      createdAt: "2022-10-20T10:43:17.919Z",
      updatedAt: "2022-10-20T12:24:15.915Z",
      slug: "jwtio-allows-you-to-decode-verify-and-generate-jwt-11097",
      __v: 0,
      id: "635126456507ae95e7889189",
    },
    {
      library: {
        content: "",
        images: [],
        previewVideo:
          "https://res.cloudinary.com/amazona-app/video/upload/v1666277388/n94qcjiwxe3vztnunqnj.mp4",
      },
      _id: "6351567433a58994112e82bc",
      title: "Create a slug and add a slug to mongoose schema",
      thumbnail:
        "https://res.cloudinary.com/amazona-app/image/upload/v1666262598/oyjam7slcee3ctz3y4xx.jpg",
      tag: [],
      languages: [],
      shortDescription:
        "Create a slug from a mongoose schema title (or any key really), store the slug in the title so you can use it to route route route",
      starCount: 0,
      isHide: true,
      createdAt: "2022-10-20T14:08:52.565Z",
      updatedAt: "2022-10-20T14:49:48.974Z",
      slug: "create-a-slug-and-add-a-slug-to-mongoose-schema-28919",
      __v: 0,
      id: "6351567433a58994112e82bc",
    },
  ];
  return (
    <>
      <Header hasBg={true} />
      <ProfileTab user={user} />
      <div className={cx("container", "profile-container")}>
        <div className={cx("left-content")}>
          <UserProfile user={user} />
        </div>
        <div className={cx("right-content")}>
          <SearchProject />
          {projects.map((project, index) => (
            <ProjectBoxProfile project={project} key={index} />
          ))}

          <Pagination />
        </div>
      </div>
      <div className={cx("container", "profile-bottom")}>
        <div className="separate"></div>
      </div>
      <Footer />
    </>
  );
}

Profile.propTypes = {};

export default Profile;
