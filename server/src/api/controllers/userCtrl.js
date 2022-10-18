const expressAsyncHandler = require("express-async-handler");
const {
  checkRegisterEmail,
  createUser,
  checkUsernameExist,
  checkPassword,
} = require("../services/userService");
const { generateToken } = require("../utils/tokenGenerate");
//// Register
const registerUserCtrl = expressAsyncHandler(async (req, res) => {
  try {
    await checkRegisterEmail(req?.body?.email);

    const user = await createUser(req.body);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Login
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const { username, password } = req?.body;
    const user = await checkUsernameExist(username);

    checkPassword(password, user);

    const token = generateToken({ username, id: user?._id });
    res.setHeader("Authorization", token);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  registerUserCtrl,
  loginUserCtrl,
};
