const route = require("express").Router();
const { passportAuthJwt } = require("../middleware/auth/passportAuthJwt");
const {
  projectCreateCtrl,
} = require("../controllers/projectCtrl");
const {
  projectThumbnailMulter,
  projectThumbnailResizing,
} = require("../middleware/uploads/photoUpload");

route.post(
  "/create",
  projectThumbnailMulter.single("thumbnail"),
  projectThumbnailResizing,
  passportAuthJwt,
  projectCreateCtrl
);

module.exports = route;
