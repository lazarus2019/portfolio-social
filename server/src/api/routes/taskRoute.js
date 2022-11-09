const route = require("express").Router();
const {
  taskCreateCtrl,
  taskUpdateCtrl,
  taskUpdatePositionCtrl,
  taskDeleteCtrl,
} = require("../controllers/taskCtrl");
const { passportAuthJwt } = require("../middleware/auth/passportAuthJwt");

route.post("/:boardId", passportAuthJwt, taskCreateCtrl);

route.put("/:taskId", passportAuthJwt, taskUpdateCtrl);

route.put("/update-position/:boardId", passportAuthJwt, taskUpdatePositionCtrl);

route.delete("/:taskId", passportAuthJwt, taskDeleteCtrl);

module.exports = route;
