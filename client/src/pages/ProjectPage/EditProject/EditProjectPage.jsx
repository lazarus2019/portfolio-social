import classnames from "classnames/bind";
import styles from "./EditProjectPage.module.scss";

const cx = classnames.bind(styles);
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getErrorMessage from "@/utils/getErrorMessage";
import projectAPI from "@/api/projectAPI";
import NotFound from "@/components/NotFound/NotFound";
import EditProjectForm from "@/components/Forms/EditProjectForm";
import { useSelector } from "react-redux";

function EditProjectPage(props) {
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user?.value);
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUpdateThumbnail, setUpdateThumbnail] = useState(false);

  const getProjectById = async () => {
    try {
      const res = await projectAPI.getById(id);
      if (res.result) {
        setProject(res.result);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (id) {
      getProjectById();
    }
  }, [id]);

  const handleUpdateThumbnail = async (thumbnail) => {
    setUpdateThumbnail(true);
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("projectId", project.id);
    formData.append("oldThumbnailUrl", project.thumbnail);
    try {
      const res = await projectAPI.updateThumbnail(formData);
      if (res.status) {
        toast.success("Thumbnail is updated!");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
    setUpdateThumbnail(false);
  };

  const handleUpdate = async (values) => {
    setLoading(true);
    if (values) {
      // remove prop thumbnail
      delete values.thumbnail;
      // remove prop title if they not change
      if (project.title === values.title?.trim()) {
        delete values.title;
      }
      const data = {
        ...values,
        projectId: id,
      };

      const res = await projectAPI.update(data);
      if (res.status) {
        toast.success("Project is updated!");
        navigate(`/@${user?.username}`);
      }
      try {
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }
    setLoading(false);
  };

  return (
    <div className={cx("container")}>
      {project ? (
        <EditProjectForm
          project={project}
          onUpdateThumbnail={handleUpdateThumbnail}
          onUpdate={handleUpdate}
          loading={loading}
          isUpdateThumbnail={isUpdateThumbnail}
        />
      ) : (
        <NotFound desc="Project Not Found" />
      )}
    </div>
  );
}

EditProjectPage.propTypes = {};

export default EditProjectPage;
