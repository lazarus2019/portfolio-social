const route = require("express").Router();
const { passportAuthJwt } = require("../middleware/auth/passportAuthJwt");
const {
  projectCreateCtrl,
  projectGetOwnCtrl,
} = require("../controllers/projectCtrl");
const {
  projectThumbnailMulter,
  projectThumbnailResizing,
} = require("../middleware/uploads/photoUpload");

route.get("/", passportAuthJwt, projectGetOwnCtrl);

route.post(
  "/create",
  projectThumbnailMulter.single("thumbnail"),
  projectThumbnailResizing,
  passportAuthJwt,
  projectCreateCtrl
);

module.exports = route;
