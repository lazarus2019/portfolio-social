const route = require("express").Router();
const {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  userUpdateProfileCtrl,
  userFollowCtrl,
} = require("../controllers/userCtrl");
const { passportAuthJwt } = require("../middleware/auth/passportAuthJwt");

route.post("/register", userRegisterCtrl);

route.post("/login", userLoginCtrl);

route.put("/profile", passportAuthJwt, userUpdateProfileCtrl);

route.get("/profile/:username", userProfileCtrl);

route.put("/follow", passportAuthJwt, userFollowCtrl);

module.exports = route;
