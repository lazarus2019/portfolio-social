import classNames from "classnames/bind";
import styles from "./Forms.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import InputField from "./FormFields/InputField";
import Grid from "../Grid/Grid";
import DropZone from "../DropZone/DropZone";
import TextareaField from "./FormFields/TextAreaField";

const formSchema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  bio: yup.string(),
  photo: yup.mixed().required("Profile photo is required"),
  isPrivate: yup.boolean(),
});

function ProfileInfoForm(props) {
  const { user, onUpdate, onUpdatePhoto, loading, isUpdatePhoto } = props;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: user?.fullName || "",
      bio: user?.bio || "",
      photo: user?.profilePhoto || "",
      isPrivate: user?.isHide || false,
    },
    onSubmit: (values) => {
      if (!onUpdate) return;
      // delete photo prop
      delete values?.photo;
      const newValues = {...values, "info.bio": values?.bio}
      // delete bio prop
      delete newValues?.bio
      onUpdate(newValues);
    },
    validationSchema: formSchema,
  });

  const handleSetPhoto = (file) => {
    formik.setFieldValue("photo", file);
  };

  const handleUpdatePhoto = () => {
    if (!onUpdatePhoto) return;
    onUpdatePhoto(formik.values?.photo);
  };

  return (
    <form onSubmit={formik.handleSubmit} className={cx("profile-form")}>
      <h2 className={cx("profile-form__header")}>Public profile</h2>
      <Grid gap={30} col={2}>
        <div>
          <InputField
            label="Full Name*"
            className="normal"
            value={formik.values.fullName}
            onChange={formik.handleChange("fullName")}
            onBlur={formik.handleBlur("fullName")}
            errors={formik.touched.fullName && formik.errors.fullName}
          />
          <TextareaField
            label="Bio"
            className="normal"
            value={formik.values.bio}
            onChange={formik.handleChange("bio")}
            onBlur={formik.handleBlur("bio")}
            errors={formik.touched.bio && formik.errors.bio}
            placeholder="Tell us a little bit about yourself"
          />
          <p className={cx("profile-form__note")}>
            All of the fields on this page are optional and can be deleted at
            any time, and by filling them out, you're giving us consent to share
            this data wherever your user profile appears. Please see our privacy
            statement to learn more about how we use this information.
          </p>
          <button
            className={cx(
              "create-project__form__submit-btn",
              "m-15",
              "redirect",
              `${loading && "disabled-btn"}`
            )}
            type="submit"
          >
            {loading ? "Loading..." : "Update Profile"}
          </button>
        </div>
        <div>
          <DropZone
            setValue={handleSetPhoto}
            updateImage={handleUpdatePhoto}
            label="Profile picture*"
            errors={formik.touched.photo && formik.errors.photo}
            value={formik.values.photo}
            maxSize={1}
            isEdit={true}
            isRound={true}
            isUpdateImage={isUpdatePhoto}
          />
        </div>
      </Grid>
    </form>
  );
}

ProfileInfoForm.propTypes = {};

export default ProfileInfoForm;
