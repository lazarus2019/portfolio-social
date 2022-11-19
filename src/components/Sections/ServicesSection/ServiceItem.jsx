import classNames from "classnames/bind";
import styles from "./ServicesSection.module.scss";
const cx = classNames.bind(styles);

function ServiceItem({ item }) {
  return (
    <div className={cx("service-item")}>
      <div className={cx("service-item__icon")}>{item.icon}</div>
      <div className={cx("service-item__content")}>
        <div className={cx("service-item__content__title")}>{item.title}</div>
        <div className={cx("service-item__content__desc")}>{item.desc}</div>
      </div>
    </div>
  );
}

ServiceItem.propTypes = {};

export default ServiceItem;
