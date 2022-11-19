import userAPI from "api/userAPI";
import assets from "assets";
import classNames from "classnames/bind";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import getErrorMessage from "utils/getErrorMessage";
import FeedbackForm from "../Forms/FeedbackForm";
import Grid from "../Grid/Grid";
import Modal from "../Modal/Modal";
import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

function NotFound(props) {
  const { desc = "Page not found" } = props;
  const [isShowModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSendContact = async (values) => {
    setLoading(true);
    try {
      const res = await userAPI.sendFeedback(values);
      toast.success("Thank you for sending feedback, we'll reply you soon!");
      setShowModal(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
    setLoading(false);
  };

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
            <div
              className={cx("notfound__content__redirect__btn")}
              onClick={() => setShowModal(!isShowModal)}
            >
              Contact us
            </div>
          </div>
          <div className={cx("notfound__content__shape")}></div>
        </div>
      </Grid>
      {isShowModal ? (
        <Modal>
          <FeedbackForm
            onSubmit={handleSendContact}
            onClose={() => setShowModal(false)}
            loading={loading}
          />
        </Modal>
      ) : null}
    </div>
  );
}

NotFound.propTypes = {};

export default NotFound;
