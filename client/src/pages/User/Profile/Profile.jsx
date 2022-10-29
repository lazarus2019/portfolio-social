import userAPI from "@/api/userAPI";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Loading from "@/components/Loading/Loading";
import NotFound from "@/components/NotFound/NotFound";
import Pagination from "@/components/Pagination/Pagination";
import ProfileTab from "@/components/ProfileTab/ProfileTab";
import ProjectBoxProfile from "@/components/ProjectBoxProfile/ProjectBoxProfile";
import SearchProject from "@/components/Search/SearchProfile/SearchProject";
import UserProfile from "@/components/UserProfile/UserProfile";
import classNames from "classnames/bind";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);

function Profile(props) {
  // const { username } = useParams();
  const location = useLocation();
  const username = useMemo(() => {
    return location.pathname.split("/@")[1];
  }, [location]);

  const currentUser = useSelector((store) => store?.user?.value);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const res = await userAPI.profile(username);
      setUser(res.user);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useLayoutEffect(() => {
    if (username) {
      getUser();
    }
    window.scrollTo(0, 0);
    setLoading(false);
  }, [username]);

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
      {loading ? (
        <Loading fullHeight />
      ) : user ? (
        <>
          <ProfileTab
            user={user}
            isCurrentUser={currentUser ? currentUser?.id === user?.id : false}
            isFollowing={
              currentUser
                ? currentUser?.following?.find((id) => id === user?.id)
                : false
            }
          />
          <div className={cx("container", "profile-container")}>
            <div className={cx("left-content")}>
              <UserProfile
                user={user}
                isCurrentUser={
                  currentUser ? currentUser?.id === user?.id : false
                }
                isFollowing={
                  currentUser
                    ? currentUser?.following?.find((id) => id === user?.id)
                    : false
                }
              />
            </div>
            <div className={cx("right-content")}>
              <SearchProject
                isCurrentUser={
                  currentUser ? currentUser?.id === user?.id : false
                }
              />
              {projects.map((project, index) => (
                <ProjectBoxProfile project={project} key={index} />
              ))}

              <Pagination />
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
