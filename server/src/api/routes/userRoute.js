const route = require("express").Router();
const { registerUserCtrl } = require("../controllers/userCtrl");

route.post("/register", registerUserCtrl);

module.exports = route;
