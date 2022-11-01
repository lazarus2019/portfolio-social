import classNames from "classnames/bind";
import styles from "./DropZone.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BsFillXCircleFill } from "react-icons/bs";

function DropZone(props) {
  const {
    maxSize = 2,
    multiple = false,
    maxFiles = 1,
    setValue,
    label = "Upload Image",
    errors,
  } = props;
  const [file, setFile] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: multiple,
    maxFiles: maxFiles,
    maxSize: 1024 * 1024 * maxSize, // maxSize * MB
    onDrop: (acceptedFiles, fileRejections) => {
      // Single file
      if (maxFiles === 1) {
        if (acceptedFiles?.length > 0) {
          if (setValue) {
            setValue(acceptedFiles[0]);
          }
          setFile(
            Object.assign(acceptedFiles[0], {
              preview: URL.createObjectURL(acceptedFiles[0]),
            })
          );
          return;
        }
        // Handle errors
        fileRejections[0].errors.forEach((err) => {
          if (err.code === "file-too-large") {
            toast.error(`Error: ${err.message}`);
          }
          if (err.code === "file-invalid-type") {
            toast.error(`Error: ${err.message}`);
          }
          if (err.code === "too-many-files") {
            toast.error(`Error: ${err.message}`);
          }
        });
      } else {
        // Multiple files
        acceptedFiles.forEach((file) => {
          setFile((prev) => [
            ...prev,
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ]);
        });

        // Handle errors
        fileRejections.forEach((file) => {
          file.errors.forEach((err) => {
            if (err.code === "file-too-large") {
              toast.error(`Error: ${err.message}`);
            }

            if (err.code === "file-invalid-type") {
              toast.error(`Error: ${err.message}`);
            }
          });
        });
      }
    },
  });

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
        setFile(null);
      }
    };
  }, []);

  return (
    <div className={cx("dropzone-wrapper")}>
      <label className="label">{label}</label>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={cx("dropzone-container", `${file ? "active" : ""}`)}
      >
        <input {...getInputProps()} />
        {file ? (
          <>
            <BsFillXCircleFill
              size={20}
              className={cx("dropzone-container__remove")}
              onClick={(e) => {
                e.stopPropagation();
                if (setValue) {
                  setValue(null);
                }
                setFile(null);
              }}
            />
            <img
              src={file.preview}
              className={cx("dropzone-container__preview")}
            />
          </>
        ) : (
          <p className={cx("dropzone-container__header")}>
            Drag 'n' drop some files here, or click to select files <br/>
            Max file size: {maxSize}MB
          </p>
        )}
      </div>
      {errors && <div className={cx("dropzone__error")}>{errors}</div>}
    </div>
  );
}

DropZone.propTypes = {};

export default DropZone;
