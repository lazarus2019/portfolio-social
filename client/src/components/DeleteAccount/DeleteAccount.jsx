import classNames from "classnames/bind";
import styles from "./DeleteAccount.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { BasicButton } from "../Button/Button";
import { useState } from "react";
import Modal from "../Modal/Modal";

function DeleteAccount(props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={cx("delete-account")}>
      <p className={cx("p-note")}>
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <BasicButton
        content="Delete your account"
        className={cx("delete-account__danger-btn")}
        onClick={() => setShowModal(!showModal)}
      />
      {showModal ? <Modal>
        
      </Modal> : null}
    </div>
  );
}

DeleteAccount.propTypes = {};

export default DeleteAccount;
