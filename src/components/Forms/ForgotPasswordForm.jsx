import classNames from "classnames/bind";
import { useFormik } from "formik";
import * as yup from "yup";
import InputField from "./FormFields/InputField";
import styles from "./Forms.module.scss";

const cx = classNames.bind(styles);

const formSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

function ForgotPasswordForm(props) {
  const { onSubmit, loading } = props;
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      if (!onSubmit) return;
      onSubmit(values);
    },
    validationSchema: formSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <InputField
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          errors={formik.touched.email && formik.errors.email}
        />

        <div className={cx("form__bottom")}>
          {loading ? (
            <button
              type="submit"
              className={cx(
                "form__bottom__submit-btn",
                "fullWidth",
                "disabled-btn"
              )}
            >
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className={cx("form__bottom__submit-btn", "fullWidth")}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

ForgotPasswordForm.propTypes = {};

export default ForgotPasswordForm;
