const route = require("express").Router();
const { passportAuthJwt } = require("../middleware/auth/passportAuthJwt");
const adminMiddleware = require("../middleware/auth/adminMiddleware");
const {
  projectCreateCtrl,
  projectGetBySlugCtrl,
  projectGetOwnCtrl,
  projectGetByUsernameCtrl,
  projectAddToSaveCtrl,
  projectGetSavedCtrl,
  projectHideCtrl,
  projectPreviewVideoUploadCtrl,
  projectGetAllCtrl,
  projectUpdateThumbnailCtrl,
  projectDeleteCtrl,
  projectUpdateCtrl,
  projectGetByIdCtrl,
  projectGetNewestCtrl,
  projectGetPopularCtrl,
} = require("../controllers/projectCtrl");
const {
  projectThumbnailMulter,
  projectThumbnailResizing,
} = require("../middleware/uploads/photoUpload");
const { previewVideoMulter } = require("../middleware/uploads/videoUpload");

route.get("/all", passportAuthJwt, adminMiddleware, projectGetAllCtrl);

route.get("/newest", projectGetNewestCtrl);

route.get("/popular", projectGetPopularCtrl);

route.get("/saved", passportAuthJwt, projectGetSavedCtrl);

route.put("/saved", passportAuthJwt, projectAddToSaveCtrl);

route.get("/s/:slug", projectGetBySlugCtrl);

route.get("/", passportAuthJwt, projectGetOwnCtrl);

route.get("/:username", projectGetByUsernameCtrl);

route.get("/p/:projectId", passportAuthJwt, projectGetByIdCtrl);

// Remove the old video - ERROR
route.post(
  "/create",
  projectThumbnailMulter.single("thumbnail"),
  projectThumbnailResizing,
  passportAuthJwt,
  projectCreateCtrl
);

route.put(
  "/update-thumbnail",
  projectThumbnailMulter.single("thumbnail"),
  projectThumbnailResizing,
  passportAuthJwt,
  projectUpdateThumbnailCtrl
);

route.put(
  "/preview-video",
  previewVideoMulter.single("previewVideo"),
  passportAuthJwt,
  projectPreviewVideoUploadCtrl
);

route.delete("/delete", passportAuthJwt, projectDeleteCtrl);

route.put("/update", passportAuthJwt, projectUpdateCtrl);

route.put("/hide", passportAuthJwt, projectHideCtrl);

module.exports = route;
