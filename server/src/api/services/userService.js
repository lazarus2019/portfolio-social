const User = require("../models/userModel");

const checkRegisterEmail = async (email) => {
  if (!email)
    throw new Error("Email Address is required || checkRegisterEmail");
  const userExists = await User.findOne({ email });
  if (userExists)
    throw new Error(
      "Email Address is Already Registered || checkRegisterEmail"
    );
};

const createUser = async ({
  firstName,
  lastName,
  username,
  password,
  email,
}) => {
  const user = await User.create({
    firstName,
    lastName,
    username,
    password,
    email,
  });

  return user;
};

const checkUsernameExist = async (username) => {
  if (!username) throw new Error("Username is required || checkUsernameExist");
  const user = await User.findOne({ username }).select("_id username password");
  if (!user) throw new Error("User not found || checkUsernameExist");

  return user;
};

const checkPassword = async (enterPass, user) => {
  if (!enterPass || !user)
    throw new Error("enterPass and user is required || checkPassword");
  if (user.isPasswordMatched(enterPass)) return;
  throw new Error("Password not matched || checkPassword");
};

module.exports = {
  checkRegisterEmail,
  createUser,
  checkUsernameExist,
  checkPassword,
};
