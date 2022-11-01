import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);

import PropTypes from "prop-types";
import Grid from "../Grid/Grid";

import assets from "@/assets";
import { Link } from "react-router-dom";
import {
  BsTwitter,
  BsLinkedin,
  BsFacebook,
  BsYoutube,
  BsGithub,
} from "react-icons/bs";

const footerAboutLinks = [
  {
    title: "Project",
    path: "/about",
  },
  {
    title: "User",
    path: "/about",
  },
  {
    title: "Board",
    path: "/about",
  },
];

const footerCustomerLinks = [
  {
    title: "Term",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/about",
  },
  {
    title: "About",
    path: "/about",
  },
];

const footerSocialLinks = [
  {
    icon: <BsTwitter size={20} />,
    url: "https://react-icons.github.io/react-icons/search?q=twi",
  },
  {
    icon: <BsLinkedin size={20} />,
    url: "https://react-icons.github.io/react-icons/search?q=twi",
  },
  {
    icon: <BsFacebook size={20} />,
    url: "https://react-icons.github.io/react-icons/search?q=twi",
  },
  {
    icon: <BsYoutube size={20} />,
    url: "https://react-icons.github.io/react-icons/search?q=twi",
  },
  {
    icon: <BsGithub size={20} />,
    url: "https://react-icons.github.io/react-icons/search?q=twi",
  },
];

function Footer(props) {
  return (
    <footer
      className={cx("container", "footer", `${props.wide ? "wide" : ""}`)}
    >
      <Grid col={4}>
        <div className={cx("footer__about")}>
          <div className={cx("footer__about__logo")}>
            <img src={assets.images.logoBlack} alt="" />
          </div>
          <div className={cx("footer__about__content")}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ut
            tempore beatae pariatur aut vitae, id perspiciatis praesentium
            temporibus repellendus?
          </div>
        </div>
        <div></div>
        <div className={cx("footer__link")}>
          <h4 className={cx("footer__link__header")}>About</h4>
          <div className={cx("footer__link__list")}>
            {footerAboutLinks.map((link, index) => (
              <Link
                to={`${link.path}`}
                className={cx("footer__link__item")}
                key={index}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        <div className={cx("footer__link")}>
          <h4 className={cx("footer__link__header")}>Customer</h4>
          <div className={cx("footer__link__list")}>
            {footerCustomerLinks.map((link, index) => (
              <Link
                to={`${link.path}`}
                className={cx("footer__link__item")}
                key={index}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </Grid>
      <div className={cx("flex", "space-between", "footer-bottom")}>
        <div className={cx("copyright")}>
          &copy;{new Date().getFullYear()} Portfolio Social
        </div>
        <div className={cx("social__list")}>
          {footerSocialLinks.map((link, index) => (
            <a
              className={cx("social__list__item")}
              href={link.url}
              target="_blank"
              key={index}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {};

export default Footer;
