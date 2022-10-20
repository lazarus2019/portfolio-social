const route = require("express").Router();
const { passportAuthJwt } = require("../middleware/auth/passportAuthJwt");
const {
  projectCreateCtrl,
  projectGetBySlugCtrl,
  projectGetOwnCtrl,
  projectGetByUsernameCtrl,
} = require("../controllers/projectCtrl");
const {
  projectThumbnailMulter,
  projectThumbnailResizing,
} = require("../middleware/uploads/photoUpload");


route.get("/s/:slug", projectGetBySlugCtrl);

route.get("/", passportAuthJwt, projectGetOwnCtrl);

route.get("/:username", projectGetByUsernameCtrl);

route.post(
  "/create",
  projectThumbnailMulter.single("thumbnail"),
  projectThumbnailResizing,
  passportAuthJwt,
  projectCreateCtrl
);

module.exports = route;
