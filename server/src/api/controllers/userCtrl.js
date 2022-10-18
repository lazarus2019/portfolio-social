const expressAsyncHandler = require("express-async-handler");
const {
  checkRegisterEmail,
  createUser,
  checkUsernameExist,
  checkPassword,
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

    checkPassword(password, user);

    const token = generateToken({ username, id: user?._id });
    res.setHeader("Authorization", token);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Profile
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { username } = req.params;
  try {
    const user = await checkUsernameExist(username);

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
};
