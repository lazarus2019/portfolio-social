const expressAsyncHandler = require("express-async-handler");
const {
  checkRegisterEmail,
  createUser,
  checkUsernameExist,
  checkPassword,
  checkUserBanned,
  updateProfile,
  following,
  unFollowing,
} = require("../services/userService");
const { generateToken } = require("../utils/tokenGenerate");
const mongoose = require("mongoose");
const validateMongoDbID = require("../utils/validateMongoDbID");

//// Register
const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  try {
    await checkRegisterEmail(req?.body?.email);

    const user = await createUser(req.body);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Login
const userLoginCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const { username, password } = req?.body;
    const user = await checkUsernameExist(username, true);

    checkUserBanned(user);

    checkPassword(password, user);

    const token = generateToken({ username, id: user?._id });
    res.setHeader("Authorization", token);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Get Profile
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { username } = req.params;
  try {
    const user = await checkUsernameExist(username);

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Update Basic Info Profile
const userUpdateProfileCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const user = req?.user;
    checkUserBanned(user);

    const userUpdated = await updateProfile(user?._id, req?.body);
    res.status(200).json({
      firstName: userUpdated.firstName,
      lastName: userUpdated.lastName,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Following other user
const userFollowCtrl = expressAsyncHandler(async (req, res) => {
  const { followId } = req?.body;
  validateMongoDbID(new mongoose.Types.ObjectId(followId));
  try {
    const user = req?.user;

    const alreadyFollowing = user?.info?.following?.find(
      (user) => user?.toString() === followId.toString()
    );

    if (alreadyFollowing) {
      unFollowing(user?._id, followId);
    } else {
      following(user?._id, followId);
    }
    res.status(200).json({ status: true });
  } catch (error) {}
});

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  userUpdateProfileCtrl,
  userFollowCtrl,
};
