const route = require("express").Router();
const {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  userUpdateProfileCtrl,
  userFollowCtrl,
  userFollowersListCtrl,
  userFollowingListCtrl,
  userForgetPasswordCtrl,
  userResetPasswordCtrl,
  userVerifyTokenCtrl,
  userVerifyAccountCtrl,
  userFeedbackCtrl,
  userProfilePhotoUploadCtrl,
  userBanningCtrl,
  userGetByEmailCtrl,
  userGetByIdCtrl,
} = require("../controllers/userCtrl");
const { passportAuthJwt } = require("../middleware/auth/passportAuthJwt");
const adminMiddleware = require("../middleware/auth/adminMiddleware");
const {
  profilePhotoMulter,
  profilePhotoResizing,
} = require("../middleware/uploads/photoUpload");

route.post("/register", userRegisterCtrl);

route.post("/login", userLoginCtrl);

route.put("/profile", passportAuthJwt, userUpdateProfileCtrl);

route.get("/profile/:username", userProfileCtrl);

route.put("/follow", passportAuthJwt, userFollowCtrl);

route.get("/followers/:username", userFollowersListCtrl);

route.get("/following/:username", userFollowingListCtrl);

route.post("/forget-password-token", userForgetPasswordCtrl);

route.put("/reset-password", userResetPasswordCtrl);

route.post("/verify-account-token", passportAuthJwt, userVerifyTokenCtrl);

route.put("/verify-account", userVerifyAccountCtrl);

route.post("/send-feedback", passportAuthJwt, userFeedbackCtrl);

route.put(
  "/profilephoto-upload",
  passportAuthJwt,
  profilePhotoMulter.single("photo"),
  profilePhotoResizing,
  userProfilePhotoUploadCtrl
);

//// [ADMIN]
route.put("/banning", passportAuthJwt, adminMiddleware, userBanningCtrl);

route.get("/get-by-email", passportAuthJwt, adminMiddleware, userGetByEmailCtrl);

route.get("/get-by-id", passportAuthJwt, adminMiddleware, userGetByIdCtrl);

module.exports = route;
