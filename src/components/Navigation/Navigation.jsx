import classNames from "classnames/bind";
import {
  BsBox,
  BsChevronDown,
  BsCodeSquare,
  BsColumnsGap,
  BsLaptop,
  BsShieldCheck,
} from "react-icons/bs";
import DropdownMenu from "../Dropdown/DropdownMenu";
import styles from "./Navigation.module.scss";
const cx = classNames.bind(styles);

const homeNavigate = [
  {
    title: "Product",
    dropdown: true,
    children: [
      {
        title: "Actions",
        icon: <BsColumnsGap size={20} color="#57606a" />,
        desc: "Automate any flow",
        url: "/actions",
      },
      {
        title: "Packages",
        icon: <BsBox size={20} color="#57606a" />,
        desc: "Host and manage packages",
        url: "/packages",
      },
      {
        title: "Security",
        icon: <BsShieldCheck size={20} color="#57606a" />,
        desc: "Find and fix vulnerabilities",
        url: "/security",
      },
      {
        title: "Codespaces",
        icon: <BsLaptop size={20} color="#57606a" />,
        desc: "Instant dev environments",
        url: "/codespaces",
      },
      {
        title: "Code review",
        icon: <BsCodeSquare size={20} color="#57606a" />,
        desc: "Manage code changes",
        url: "/codereview",
      },
    ],
  },
  {
    title: "Solutions",
    dropdown: true,
    children: [
      {
        title: "Actions",
        icon: <BsColumnsGap size={20} color="#57606a" />,
        desc: "Automate any flow",
        url: "/actions",
      },
      {
        title: "Packages",
        icon: <BsBox size={20} color="#57606a" />,
        desc: "Host and manage packages",
        url: "/packages",
      },
      {
        title: "Security",
        icon: <BsShieldCheck size={20} color="#57606a" />,
        desc: "Find and fix vulnerabilities",
        url: "/security",
      },
      {
        title: "Codespaces",
        icon: <BsLaptop size={20} color="#57606a" />,
        desc: "Instant dev environments",
        url: "/codespaces",
      },
      {
        title: "Code review",
        icon: <BsCodeSquare size={20} color="#57606a" />,
        desc: "Manage code changes",
        url: "/codereviews",
      },
      {
        title: "Actions",
        icon: <BsColumnsGap size={20} color="#57606a" />,
        desc: "Automate any flow",
        url: "/actions",
      },
      {
        title: "Packages",
        icon: <BsBox size={20} color="#57606a" />,
        desc: "Host and manage packages",
        url: "/actions",
      },
      {
        title: "Security",
        icon: <BsShieldCheck size={20} color="#57606a" />,
        desc: "Find and fix vulnerabilities",
        url: "/actions",
      },
    ],
  },
  {
    title: "Pricing",
    dropdown: false,
    url: "/pricing",
  },
];

function Navigation(props) {
  return (
    <div className={cx("navigation")}>
      {props?.homeNavigate && (
        <ul className={cx("navigation__list")}>
          {homeNavigate.map((navigation, index) => (
            <li className={cx("navigation__list__item")} key={index}>
              <span>
                {navigation.title}{" "}
                {navigation.dropdown && (
                  <BsChevronDown
                    className={cx("navigation__list__item__icon")}
                    size={10}
                  />
                )}
              </span>
              {navigation.dropdown && (
                <DropdownMenu
                  className={cx("dropdown-menu")}
                  items={navigation.children}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Navigation.propTypes = {};

export default Navigation;
