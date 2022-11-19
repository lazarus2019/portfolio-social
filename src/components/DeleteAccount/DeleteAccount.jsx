import classNames from "classnames/bind";
import { useState } from "react";
import { BasicButton } from "../Button/Button";
import Modal from "../Modal/Modal";
import styles from "./DeleteAccount.module.scss";

const cx = classNames.bind(styles);

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
