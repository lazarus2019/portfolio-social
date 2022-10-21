import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";

const cx = classNames.bind(styles);

function HomePage() {
  return (
    <div className={cx("wrapper")}>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, unde!</p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quo atque voluptate, nesciunt quisquam nemo et est sequi id itaque!
      <div className={cx("container", "row")}>
        <div className="col-6">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio
          adipisci harum fugit veniam non itaque corrupti incidunt voluptas
          illum nulla?
        </div>
        <div className="col-6">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio
          adipisci harum fugit veniam non itaque corrupti incidunt voluptas
          illum nulla?
        </div>
      </div>
    </div>
  );
}

HomePage.propTypes = {};

export default HomePage;
