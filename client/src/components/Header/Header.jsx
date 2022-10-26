import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

import assets from "@/assets";
import Button from "../Button/Button";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { BsPlusLg, BsFillCaretDownFill } from "react-icons/bs";
import { CiFaceSmile } from "react-icons/ci";

function Header({ hasBg }) {
  const isLogged = true;
  return (
    <div className={cx("header", `${hasBg ? "hasBg" : ""}`)}>
      <div className={cx("container", "flex", "space-between", "y-center")}>
        <div className={cx("header__left")}>
          <Link to="/" className={cx("logo")}>
            <img src={assets.images.logo} alt="" />
          </Link>
          <div>
            <input
              className={cx("search-box")}
              type="text"
              placeholder="Search Project"
            />
          </div>
        </div>

        <div className={cx("header__right")}>
          <Navigation homeNavigate />
          <Button content="Sign in" />
          <Button content="Sign up" className="outline" />
          {isLogged && (
            <div className={cx("header__list")}>
              <div className={cx("header__menu")}>
                <BsPlusLg size={10} color="#fff" />
                <BsFillCaretDownFill
                  size={10}
                  className={cx("dropdown-icon")}
                />
                <div className={cx("dropdown-menu")}>
                  <Link to="" className={cx("dropdown-menu__item")}>
                    New Project
                  </Link>
                  <Link to="" className={cx("dropdown-menu__item")}>
                    New Board
                  </Link>
                </div>
              </div>
              <div className={cx("header__menu")}>
                <div className={cx("header__menu__photo")}>
                  <img
                    src="https://res.cloudinary.com/amazona-app/image/upload/v1665804263/blank_profile_znhwkp.png"
                    alt=""
                  />
                </div>
                <BsFillCaretDownFill
                  size={10}
                  className={cx("dropdown-icon")}
                />
                <div className={cx("dropdown-menu")}>
                  <Link to={`/@username`} className={cx("logged-user")}>
                    <p>Signed in as</p>
                    <p className={cx("logged-user__username")}>lazarus2019</p>
                  </Link>
                  <div className="separate"></div>
                  <div className={cx("set-bio")}>
                    <div className={cx("set-bio__content")}>
                      <CiFaceSmile size={18} /> Set bio
                    </div>
                  </div>
                  <div className="separate"></div>
                  <Link to="" className={cx("dropdown-menu__item")}>
                    Your profile
                  </Link>
                  <Link to="" className={cx("dropdown-menu__item")}>
                    Your projects
                  </Link>
                  <Link to="" className={cx("dropdown-menu__item")}>
                    Your stars
                  </Link>
                  <Link to="" className={cx("dropdown-menu__item")}>
                    Your boards
                  </Link>
                  <div className="separate"></div>
                  <Link to="" className={cx("dropdown-menu__item")}>
                    Send feedback
                  </Link>
                  <Link to="" className={cx("dropdown-menu__item")}>
                    Setting
                  </Link>
                  <div className="separate"></div>
                  <Link to="" className={cx("dropdown-menu__item")}>
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
