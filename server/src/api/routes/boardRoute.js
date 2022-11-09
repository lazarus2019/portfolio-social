const route = require("express").Router();
const {
  boardCreateCtrl,
  boardGetAllCtrl,
  boardUpdatePositionCtrl,
  boardGetFavoritesCtrl,
  boardUpdateFavoritesPositionCtrl,
  boardGetOneCtrl,
  boardUpdateCtrl,
  boardDeleteCtrl
} = require("../controllers/boardCtrl");
const { passportAuthJwt } = require("../middleware/auth/passportAuthJwt");

route.post("/create", passportAuthJwt, boardCreateCtrl);

route.get("/", passportAuthJwt, boardGetAllCtrl);

route.put("/", passportAuthJwt, boardUpdatePositionCtrl);

route.get("/favorites", passportAuthJwt, boardGetFavoritesCtrl);

route.put("/favorites", passportAuthJwt, boardUpdateFavoritesPositionCtrl);

route.get("/:boardId", passportAuthJwt, boardGetOneCtrl);

route.put("/:boardId", passportAuthJwt, boardUpdateCtrl);

route.delete("/:boardId", passportAuthJwt, boardDeleteCtrl);

module.exports = route;
