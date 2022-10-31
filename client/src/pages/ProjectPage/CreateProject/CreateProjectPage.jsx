import classnames from "classnames/bind";
import styles from "./CreateProjectPage.module.scss";

const cx = classnames.bind(styles);
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import CreateProjectFrom from "@/components/Forms/CreateProjectFrom";

function CreateProjectPage(props) {
  const currentUser = useSelector((store) => store?.user?.value);

  return (
    <div className="container">
      <CreateProjectFrom />

    </div>
  );
}

CreateProjectPage.propTypes = {};

export default CreateProjectPage;
