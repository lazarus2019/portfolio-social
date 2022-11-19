import classNames from "classnames/bind";
import styles from "./Statistic.module.scss";

const cx = classNames.bind(styles);

function StatisticBox({ item }) {
  return (
    <div className={cx("statistic-box")}>
      <div className={cx("statistic-box__amount")}>
        {item.amount}
        {item.title}
      </div>
      <div className={cx("statistic-box__desc")}>{item.desc}</div>
    </div>
  );
}

StatisticBox.propTypes = {};

export default StatisticBox;
