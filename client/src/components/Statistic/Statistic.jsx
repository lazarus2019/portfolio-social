import classNames from "classnames/bind";
import styles from "./Statistic.module.scss";
import StatisticBox from "./StatisticBox";

const cx = classNames.bind(styles);

function Statistic({ items }) {
  return (
    <div className={cx("statistic-container")}>
      {items.map((item, index) => (
        <StatisticBox item={item} key={index} />
      ))}
    </div>
  );
}

Statistic.propTypes = {};

export default Statistic;
