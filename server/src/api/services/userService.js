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

const updateProfile = async (id, newInfo) => {
  const user = await User.findByIdAndUpdate(id, newInfo, {
    new: true,
    runValidators: true,
  });

  if (!user) throw new Error("Can not update || updateProfile");

  return user;
};

const checkUsernameExist = async (username, needPass = false) => {
  if (!username) throw new Error("Username is required || checkUsernameExist");
  var user;
  if (needPass) {
    user = await User.findOne({ username }).select("_id username password");
  } else {
    user = await User.findOne({ username }).select(
      "-password -isAdmin -isAccountVerified -info.savedProject -info.follower -info.following -email"
    );
  }
  if (!user) throw new Error("User not found || checkUsernameExist");

  return user;
};

const checkPassword = async (enterPass, user) => {
  if (!enterPass || !user)
    throw new Error("enterPass and user is required || checkPassword");
  if (user.isPasswordMatched(enterPass)) return;
  throw new Error("Password not matched || checkPassword");
};

const checkUserBanned = (user) => {
  if (user?.isBan)
    throw new Error(`Access Denied ${user?.firstName} is blocked`);
};

const checkUserVerified = (user) => {
  if (user?.isAccountVerified)
    throw new Error(
      `Access Denied ${user?.firstName}, you must verify your identity`
    );
};

const findById = async (id) => {
  if (!id) throw new Error("id is required || findById");

  const user = await User.findById(id).select("-password");
  if (!user) throw new Error("User not found || findById");

  return user;
};

const following = async (loginUserId, followId) => {
  if (!loginUserId || !followId)
    throw new Error("loginUserId and followId is required || following");
  // 1. Find the user you want to follow and update it's followers field
  await User.findByIdAndUpdate(
    followId,
    {
      // append a specified value to an array
      // Docs: https://www.mongodb.com/docs/manual/reference/operator/update/push/
      $push: { "info.followers": loginUserId },
    },
    { new: true }
  );

  // 2. Update the login user following field
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { "info.following": followId },
    },
    { new: true }
  );
};

const unFollowing = async (loginUserId, unFollowId) => {
  if (!loginUserId || !unFollowId)
    throw new Error("loginUserId and unFollowId is required || unFollowing");
  await User.findByIdAndUpdate(
    unFollowId,
    {
      // remove all instances of value match
      // Docs: https://www.mongodb.com/docs/manual/reference/operator/update/pull/
      $pull: { "info.followers": loginUserId },
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { "info.following": unFollowId },
    },
    { new: true }
  );
};

module.exports = {
  checkRegisterEmail,
  createUser,
  checkUsernameExist,
  checkPassword,
  checkUserBanned,
  checkUserVerified,
  updateProfile,
  findById,
  following,
  unFollowing,
};
