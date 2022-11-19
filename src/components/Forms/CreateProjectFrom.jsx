import classNames from "classnames/bind";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BsFillCaretDownFill, BsFillCaretRightFill } from "react-icons/bs";
import * as yup from "yup";
import DropZone from "../DropZone/DropZone";
import Editor from "../Editor/Editor";
import Grid from "../Grid/Grid";
import InputField from "./FormFields/InputField";
import TextareaField from "./FormFields/TextAreaField";
import styles from "./Forms.module.scss";

const cx = classNames.bind(styles);

const formSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must at least 2 characters"),
  shortDescription: yup
    .string()
    .required("Short description is required")
    .min(2, "Short description must at least 2 characters"),
  isHide: yup.boolean(),
  content: yup.string(),
  thumbnail: yup.mixed().required("Thumbnail is required"),
});

function CreateProjectFrom(props) {
  const { onCreate, loading } = props;
  const formik = useFormik({
    initialValues: {
      title: "",
      shortDescription: "",
      isHide: false,
      content: "",
      thumbnail: null,
    },
    onSubmit: (values) => {
      if (!onCreate) return;
      onCreate(values);
    },
    validationSchema: formSchema,
  });
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setEditorLoaded(true);
    }, 200);
  }, []);

  const handleSetThumbnail = (file) => {
    formik.setFieldValue("thumbnail", file);
  };

  const handleReloadEditor = () => {
    setEditorLoaded(false);
    setTimeout(() => {
      setEditorLoaded(true);
    }, 200);
  };

  return (
    <form onSubmit={formik.handleSubmit} className={cx("create-project__form")}>
      <InputField
        label="Title*"
        className="normal"
        value={formik.values.title}
        onChange={formik.handleChange("title")}
        onBlur={formik.handleBlur("title")}
        errors={formik.touched.title && formik.errors.title}
      />

      <Grid
        col={2}
        gap={10}
        mdCol={1}
        className={cx("create-project__content")}
      >
        <div className="create-project__thumbnail">
          <TextareaField
            label="Short description*"
            className="normal"
            value={formik.values.shortDescription}
            onChange={formik.handleChange("shortDescription")}
            onBlur={formik.handleBlur("shortDescription")}
            errors={
              formik.touched.shortDescription && formik.errors.shortDescription
            }
          />
          <DropZone
            setValue={handleSetThumbnail}
            label="Upload Thumbnail*"
            errors={formik.touched.thumbnail && formik.errors.thumbnail}
          />
        </div>
        <div className="create-project__info">
          <div className={cx("edit-box")}>
            <Editor
              name="description"
              onChange={(data) => {
                formik.setFieldValue("content", data);
              }}
              editorLoaded={editorLoaded}
              onReload={handleReloadEditor}
            />
          </div>
        </div>
      </Grid>
      <AdditionalForm />

      <div className="flex x-end">
        <button
          className={cx(
            "create-project__form__submit-btn",
            "redirect",
            `${!(formik.dirty && formik.isValid) && "disabled-btn"}`,
            `${loading && "disabled-btn"}`
          )}
          type="submit"
        >
          {loading ? "Loading..." : "Create project"}
        </button>
      </div>
    </form>
  );
}

CreateProjectFrom.propTypes = {};

function AdditionalForm(props) {
  const [isShow, setShow] = useState(false);

  return (
    <>
      <label
        className={cx("create-project__additional-label")}
        onClick={() => setShow(!isShow)}
      >
        Additional{" "}
        {isShow ? (
          <BsFillCaretDownFill size={20} />
        ) : (
          <BsFillCaretRightFill size={20} />
        )}
      </label>
      {isShow ? <div>AdditionalForm</div> : null}
    </>
  );
}

export default CreateProjectFrom;
