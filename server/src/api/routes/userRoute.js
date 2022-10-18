const route = require("express").Router();
const {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
} = require("../controllers/userCtrl");
const { passportAuthJwt } = require("../middleware/auth/passportAuthJwt");

route.post("/register", userRegisterCtrl);

route.post("/login", userLoginCtrl);

route.get("/profile/:username", userProfileCtrl);

module.exports = route;
