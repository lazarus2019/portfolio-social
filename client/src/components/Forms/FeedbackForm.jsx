import classnames from "classnames/bind";
import styles from "./Forms.module.scss";

const cx = classnames.bind(styles);
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import InputField from "./FormFields/InputField";
import TextareaField from "./FormFields/TextAreaField";
import { useSelector } from "react-redux";
import { BsFillXCircleFill } from "react-icons/bs";

const formSchema = yup.object({
  fullName: yup
    .string()
    .required("Full Name is required")
    .min(2, "Full Name must at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  message: yup
    .string()
    .required("Message is required")
    .min(2, "Message must at least 2 characters"),
});

function FeedbackForm(props) {
  const { onSubmit, onClose, loading } = props;
  const user = useSelector((store) => store?.user?.value);
  const formik = useFormik({
    initialValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      message: "",
    },
    onSubmit: (values) => {
      if (!onSubmit) return;
      onSubmit(values);
    },
    validationSchema: formSchema,
  });

  const handleCloseModal = () => {
    if (!onClose) return;
    onClose();
  };

  return (
    <div className={cx("feedback-form")}>
      <div className={cx("feedback-form__header")}>
        <h3>Contact Us</h3>
        <p>Please fill this form in a decent manner</p>
        <BsFillXCircleFill onClick={handleCloseModal} size={20} />
      </div>
      <div className={cx("feedback-form__body")}>
        <form onSubmit={formik.handleSubmit}>
          <InputField
            label="Full Name*"
            className="normal"
            value={formik.values.fullName}
            onChange={formik.handleChange("fullName")}
            onBlur={formik.handleBlur("fullName")}
            errors={formik.touched.fullName && formik.errors.fullName}
          />
          <InputField
            label="Email*"
            className="normal"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            errors={formik.touched.email && formik.errors.email}
          />
          <TextareaField
            label="Message*"
            className="normal"
            value={formik.values.message}
            onChange={formik.handleChange("message")}
            onBlur={formik.handleBlur("message")}
            errors={formik.touched.message && formik.errors.message}
          />

          <button
            className={cx(
              "feedback-form__body__submit-btn",
              "redirect",
              `${!(formik.dirty && formik.isValid) && "disabled-btn"}`,
              `${loading && "disabled-btn"}`
            )}
            type="submit"
          >
            {loading ? "Loading..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

FeedbackForm.propTypes = {};

export default FeedbackForm;
