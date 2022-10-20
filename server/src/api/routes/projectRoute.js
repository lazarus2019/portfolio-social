const route = require("express").Router();
const { passportAuthJwt } = require("../middleware/auth/passportAuthJwt");
const {
  projectCreateCtrl,
  projectGetBySlugCtrl,
  projectGetOwnCtrl,
  projectGetByUsernameCtrl,
  projectAddToSaveCtrl,
  projectGetSavedCtrl,
  projectHideCtrl,
  projectPreviewVideoUploadCtrl,
} = require("../controllers/projectCtrl");
const {
  projectThumbnailMulter,
  projectThumbnailResizing,
} = require("../middleware/uploads/photoUpload");
const { previewVideoMulter } = require("../middleware/uploads/videoUpload");

route.get("/saved", passportAuthJwt, projectGetSavedCtrl);

route.put("/saved", passportAuthJwt, projectAddToSaveCtrl);

route.get("/s/:slug", projectGetBySlugCtrl);

route.get("/", passportAuthJwt, projectGetOwnCtrl);

route.get("/:username", projectGetByUsernameCtrl);

  // Remove the old video - ERROR
route.post(
  "/create",
  projectThumbnailMulter.single("thumbnail"),
  projectThumbnailResizing,
  passportAuthJwt,
  projectCreateCtrl
);

route.put(
  "/preview-video",
  previewVideoMulter.single("previewVideo"),
  passportAuthJwt,
  projectPreviewVideoUploadCtrl
);

route.put("/hide", passportAuthJwt, projectHideCtrl);

module.exports = route;
