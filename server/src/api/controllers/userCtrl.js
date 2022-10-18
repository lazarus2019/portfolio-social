const expressAsyncHandler = require("express-async-handler");
const {
  checkRegisterEmail,
  createUser,
  checkUsernameExist,
  checkPassword,
  checkUserBanned,
  updateProfile,
} = require("../services/userService");
const { generateToken } = require("../utils/tokenGenerate");

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

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  userUpdateProfileCtrl,
};
