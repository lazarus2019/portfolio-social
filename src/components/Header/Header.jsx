import assets from "assets";
import classNames from "classnames/bind";
import { BsFillCaretDownFill, BsPlusLg } from "react-icons/bs";
import { FaRegSmile } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "redux/slices/userSlice";
import Button from "../Button/Button";
import Navigation from "../Navigation/Navigation";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);


function Header({ hasBg }) {
  const user = useSelector((store) => store?.user?.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={cx("header", `${hasBg ? "hasBg" : ""}`)}>
      <div className={cx("container", "flex", "space-between", "y-center")}>
        <div className={cx("header__left")}>
          <Link to="/" className={cx("logo")}>
            <img src={assets.images.logo} />
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

          {user ? (
            <div className={cx("header__list")}>
              <div className={cx("header__menu")}>
                <BsPlusLg size={10} color="#fff" />
                <BsFillCaretDownFill
                  size={10}
                  className={cx("dropdown-icon")}
                />
                <div className={cx("dropdown-menu")}>
                  <Link
                    to="/create-project"
                    className={cx("dropdown-menu__item")}
                  >
                    New Project
                  </Link>
                  <Link to="/boards" className={cx("dropdown-menu__item")}>
                    New Board
                  </Link>
                </div>
              </div>
              <div className={cx("header__menu")}>
                <div className={cx("header__menu__photo")}>
                  <img src={user.profilePhoto} alt="" />
                </div>
                <BsFillCaretDownFill
                  size={10}
                  className={cx("dropdown-icon")}
                />
                <div className={cx("dropdown-menu")}>
                  <Link to={`/@username`} className={cx("logged-user")}>
                    <p>Signed in as</p>
                    <p className={cx("logged-user__username")}>
                      {user.username}
                    </p>
                  </Link>
                  <div className="separate"></div>
                  <div className={cx("set-bio")}>
                    <div className={cx("set-bio__content")}>
                      <FaRegSmile size={18} /> Set bio
                    </div>
                  </div>
                  <div className="separate"></div>
                  <Link
                    to={`/@${user.username}`}
                    className={cx("dropdown-menu__item")}
                  >
                    Your profile
                  </Link>
                  <Link
                    to={`/@${user.username}?tab=project`}
                    className={cx("dropdown-menu__item")}
                  >
                    Your projects
                  </Link>
                  <Link
                    to={`/@${user.username}?tab=star`}
                    className={cx("dropdown-menu__item")}
                  >
                    Your stars
                  </Link>
                  <Link to="/boards" className={cx("dropdown-menu__item")}>
                    Your boards
                  </Link>
                  <div className="separate"></div>
                  <div className={cx("dropdown-menu__item")}>Send feedback</div>
                  <Link to="/setting" className={cx("dropdown-menu__item")}>
                    Setting
                  </Link>
                  <div className="separate"></div>
                  <div
                    onClick={handleSignOut}
                    className={cx("dropdown-menu__item")}
                  >
                    Sign out
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* <Link to="/login">Sign in</Link>
              <Link to="/register">Sign up</Link> */}
              <Button to="/login" content="Sign in" />
              <Button to="/register" content="Sign up" className="outline" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
