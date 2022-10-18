const route = require("express").Router();
const {
  registerUserCtrl,
  loginUserCtrl,
} = require("../controllers/userCtrl");
const { passportAuthJwt } = require("../middleware/auth/passportAuthJwt");

route.post("/register", registerUserCtrl);

route.post("/login", loginUserCtrl);

module.exports = route;
