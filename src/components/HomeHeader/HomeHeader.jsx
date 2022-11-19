import assets from "assets";
import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../Header/Header";
import Statistic from "../Statistic/Statistic";
import styles from "./HomeHeader.module.scss";
const cx = classNames.bind(styles);


const statistics = [
  {
    title: "+ million",
    amount: 83,
    desc: "Developers",
  },
  {
    title: "+ million",
    amount: 4,
    desc: "Organizations",
  },
  {
    title: "+ million",
    amount: 200,
    desc: "Repositories",
  },
  {
    title: "%",
    amount: 90,
    desc: "Fortune 100",
  },
];

function HomeHeader(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const signUpWithEmail = () => {
    navigate(`/register?user_email=${email}`);
  };
  return (
    <>
      <Header />

      <div className={cx("container")}>
        <div
          className={cx(
            "header-container",
            "flex",
            "space-between",
            "y-center"
          )}
        >
          <div className={cx("header-container__left")}>
            <h1 className={cx("header-container__left__header")}>
              Let's build from here, together.
            </h1>
            <p className={cx("header-container__left__desc")}>
              The complete developer platform to build, scale, and deliver
              secure software.
            </p>
            <form className={cx("sign-up-box")} onSubmit={signUpWithEmail}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className={cx("sign-up-box__input")}
                placeholder="Email address"
                required
              />
              <button
                className={cx("sign-up-box__btn", "redirect")}
                type="submit"
              >
                Sign up for FREE
              </button>
            </form>
          </div>
          <div className={cx("header-container__right")}>
            <div className={cx("header-container__right__img")}>
              <div className={cx("shape")}></div>
              <img src={assets.images.homepage} alt="" />
            </div>
          </div>
        </div>
        <div className={cx("hr")}></div>
        <Statistic items={statistics} />
      </div>
    </>
  );
}

HomeHeader.propTypes = {};

export default HomeHeader;
