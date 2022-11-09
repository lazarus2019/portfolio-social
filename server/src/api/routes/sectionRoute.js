const route = require("express").Router();
const {
  sectionCreateCtrl,
  sectionUpdateCtrl,
  sectionDeleteCtrl,
  sectionUpdatePositionCtrl,
} = require("../controllers/sectionCtrl");
const { passportAuthJwt } = require("../middleware/auth/passportAuthJwt");

route.post("/", passportAuthJwt, sectionCreateCtrl);

route.put("/", passportAuthJwt, sectionUpdatePositionCtrl);

route.put("/:sectionId", passportAuthJwt, sectionUpdateCtrl);

route.delete("/:sectionId", passportAuthJwt, sectionDeleteCtrl);

module.exports = route;
