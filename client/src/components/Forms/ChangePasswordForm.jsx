import classNames from "classnames/bind";
import styles from "./Forms.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import PasswordField from "./FormFields/PasswordField";
import { Link } from "react-router-dom";

const formSchema = yup.object({
  currentPass: yup
    .string()
    .required("Current password is required")
    .min(6, "Current password must at least 6 characters"),
  newPass: yup
    .string()
    .required("New password is required")
    .min(6, "Password must at least 6 characters")
    .notOneOf(
      [yup.ref("currentPass")],
      "New password must different to current password"
    ),
  retypeNewPass: yup
    .string()
    .required("Please retype your new password")
    .oneOf([yup.ref("newPass")], "Password does not match"),
});

function ChangePasswordForm(props) {
  const { onUpdate, loading } = props;

  const formik = useFormik({
    initialValues: {
      currentPass: "",
      newPass: "",
      retypeNewPass: "",
    },
    onSubmit: (values) => {
      if (!onUpdate) return;
      // delete retype password prop
      delete values?.retypeNewPass;
      onUpdate(values);
      formik.resetForm();
    },
    validationSchema: formSchema,
  });

  return (
    <div className={cx("change-password")}>
      <p className={cx("p-note")}></p>
      <form onSubmit={formik.handleSubmit}>
        <PasswordField
          label="Current password"
          className="normal"
          value={formik.values.currentPass}
          onChange={formik.handleChange("currentPass")}
          onBlur={formik.handleBlur("currentPass")}
          errors={formik.touched.currentPass && formik.errors.currentPass}
          halfWidth
        />
        <PasswordField
          label="New password"
          className="normal"
          value={formik.values.newPass}
          onChange={formik.handleChange("newPass")}
          onBlur={formik.handleBlur("newPass")}
          errors={formik.touched.newPass && formik.errors.newPass}
          halfWidth
        />
        <PasswordField
          label="Retype new password"
          className="normal"
          value={formik.values.retypeNewPass}
          onChange={formik.handleChange("retypeNewPass")}
          onBlur={formik.handleBlur("retypeNewPass")}
          errors={formik.touched.retypeNewPass && formik.errors.retypeNewPass}
          halfWidth
        />

        <p className={cx("p-note")}>
          Make sure it's at least 6 characters OR at least 8 characters
          including a number and a lowercase letter.
        </p>

        <div className={cx("flex", "y-center")}>
          <button
            className={cx(
              "create-project__form__submit-btn",
              "m-15",
              "redirect",
              `${loading && "disabled-btn"}`
            )}
            type="submit"
          >
            {loading ? "Loading..." : "Change Password"}
          </button>
          <Link to="/forgot-password" className={cx("change-password__link")}>
            I forgot my password
          </Link>
        </div>
      </form>
    </div>
  );
}

ChangePasswordForm.propTypes = {};

export default ChangePasswordForm;
