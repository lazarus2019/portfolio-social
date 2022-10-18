const User = require("../models/userModel");

const checkRegisterEmail = async (email) => {
  if (!email) throw new Error("Email Address is required");
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("Email Address is Already Registered");
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

module.exports = {
  checkRegisterEmail,
  createUser,
};
