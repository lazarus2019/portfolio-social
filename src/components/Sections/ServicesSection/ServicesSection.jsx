import classNames from "classnames/bind";
import {
  BsClockHistory,
  BsLink45Deg,
  BsMessenger,
  BsPiggyBank
} from "react-icons/bs";
import ServiceItem from "./ServiceItem";
import styles from "./ServicesSection.module.scss";
const cx = classNames.bind(styles);

const services = [
  {
    title: "Fast Sign Up",
    icon: <BsClockHistory size={20} />,
    desc: "Create your own portfolio easier",
  },
  {
    title: "Easy Share",
    icon: <BsLink45Deg size={20} />,
    desc: "Easy create for easy share",
  },
  {
    title: "Support 24/7",
    icon: <BsMessenger size={20} />,
    desc: "We’re here for you 24/7",
  },
  {
    title: "All For Free",
    icon: <BsPiggyBank size={20} />,
    desc: "All things in this website are FREE",
  },
];

function ServicesSection(props) {
  return (
    <div className={cx("section", "flex", "services-container")}>
      {services.map((service, index) => (
        <ServiceItem item={service} key={index} />
      ))}
    </div>
  );
}

ServicesSection.propTypes = {};

export default ServicesSection;
