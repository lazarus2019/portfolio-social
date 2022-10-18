const expressAsyncHandler = require("express-async-handler");
const { checkRegisterEmail, createUser } = require("../services/userService");
//// Register
const registerUserCtrl = expressAsyncHandler(async (req, res) => {
  await checkRegisterEmail(req?.body?.email);

  const user = await createUser(req.body);
  res.status(200).json({ user });
});

module.exports = {
  registerUserCtrl,
};
