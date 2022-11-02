import classNames from "classnames/bind";
import styles from "./DropZone.module.scss";

const cx = classNames.bind(styles);
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  BsFillXCircleFill,
  BsFillExclamationOctagonFill,
} from "react-icons/bs";
import Modal from "../Modal/Modal";

function DropZone(props) {
  const {
    maxSize = 2,
    multiple = false,
    maxFiles = 1,
    setValue,
    label = "Upload Image",
    errors,
    value,
    isEdit = false,
    updateThumbnail,
    isUpdateThumbnail,
  } = props;
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
          if (isEdit) {
            setShowModal(true);
          }
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
    if (value) {
      setFile({
        preview: value,
      });
    }
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
      {isEdit ? (
        <label className="label-edit">
          (Thumbnail is individually update )
        </label>
      ) : null}
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
                if (isEdit) {
                  setShowModal(false);
                }
              }}
            />
            <img
              src={file.preview}
              className={cx("dropzone-container__preview")}
            />
          </>
        ) : (
          <p className={cx("dropzone-container__header")}>
            Drag 'n' drop some files here, or click to select files <br />
            Max file size: {maxSize}MB
          </p>
        )}
      </div>
      <UpdateThumbnailModal
        isShow={showModal}
        setShow={setShowModal}
        onUpdate={updateThumbnail}
        isUpdateThumbnail={isUpdateThumbnail}
      />
      {errors && <div className={cx("dropzone__error")}>{errors}</div>}
    </div>
  );
}

function UpdateThumbnailModal(props) {
  const { isShow, onUpdate, setShow, isUpdateThumbnail } = props;
  const handleUpdateThumbnail = () => {
    if (!onUpdate) return;
    onUpdate();
  };

  return (
    <>
      {isShow ? (
        <Modal>
          <div className={cx("update-modal")}>
            <div className={cx("update-modal__header")}>
              <BsFillExclamationOctagonFill size={25} />
              <h3>Are you sure?</h3>
            </div>
            <p className={cx("update-modal__desc")}>
              Thumbnail is individually update so click update button for
              updating. Or click Cancel to change another.
            </p>
            <div className="m-15">
              <div className="separate"></div>
            </div>
            <div className={cx("update-modal__options")}>
              <button
                type="button"
                className={cx("update-modal__options__btn", "outline")}
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={cx(
                  "update-modal__options__btn",
                  "bg",
                  `${isUpdateThumbnail && "disabled-btn"}`
                )}
                onClick={handleUpdateThumbnail}
              >
                {isUpdateThumbnail ? "Loading..." : "Update"}
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

DropZone.propTypes = {};

export default DropZone;
