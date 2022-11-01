import classnames from "classnames/bind";
import styles from "./CreateProjectPage.module.scss";

const cx = classnames.bind(styles);
import PropTypes from "prop-types";
import CreateProjectFrom from "@/components/Forms/CreateProjectFrom";
import { toast } from "react-toastify";
import getErrorMessage from "@/utils/getErrorMessage";
import projectAPI from "@/api/projectAPI";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function CreateProjectPage(props) {
  const navigate = useNavigate()
  const user = useSelector(store =>store?.user?.value)
  const [loading, setLoading] = useState(false);
  const handleCreateProject = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("thumbnail", values?.thumbnail);
    formData.append("content", values?.content);
    formData.append("shortDescription", values?.shortDescription);
    formData.append("title", values?.title);
    formData.append("isHide", values?.isHide);
    try {
      const res = await projectAPI.create(formData);
      if (res?.status) {
        toast.success("Project is created!");
        navigate(`/@${user?.username}`)
        setLoading(false);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="container">
      <CreateProjectFrom onCreate={handleCreateProject} loading={loading} />
    </div>
  );
}

CreateProjectPage.propTypes = {};

export default CreateProjectPage;
