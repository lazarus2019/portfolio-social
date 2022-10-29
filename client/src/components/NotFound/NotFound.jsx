import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import assets from "@/assets";
import { Link } from "react-router-dom";
import Grid from "../Grid/Grid";

function NotFound(props) {
  const { desc = "Page not found" } = props;
  return (
    <div className={cx("notfound", "flex")}>
      <Grid col={2}>
        <div className={cx("notfound__img")}>
          <img src={assets.images.notfound} alt="" />
        </div>
        <div className={cx("notfound__content")}>
          <h2 className={cx("notfound__content__header")}>Oops!</h2>
          <p className={cx("notfound__content__desc")}>{desc}</p>
          <div className={cx("notfound__content__redirect")}>
            <Link to="/" className={cx("notfound__content__redirect__btn")}>
              Go back home
            </Link>
            <div className={cx("notfound__content__redirect__btn")}>
              Contact us
            </div>
          </div>
          <div className={cx("notfound__content__shape")}></div>
        </div>
      </Grid>
    </div>
  );
}

NotFound.propTypes = {};

export default NotFound;
