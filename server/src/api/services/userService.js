const User = require("../models/userModel");
const {
  uploadPhotoToCloudinary,
  deleteCloudinaryPhotoById,
} = require("../utils/cloudinaryUploadPhoto");
const { paginationWithArray } = require("../utils/paginationResult");
const { getPublicId } = require("../utils/uploadFile");
const crypto = require("crypto");
const Project = require("../models/projectModel");
const { USERS_PER_PAGE } = process.env;

const checkRegisterEmail = async (email) => {
  if (!email)
    throw new Error("Email Address is required || checkRegisterEmail");
  const userExists = await User.findOne({ email });
  if (userExists)
    throw new Error(
      "Email Address is Already Registered || checkRegisterEmail"
    );
};

const createUser = async ({ fullName, username, password, email }) => {
  const user = await User.create({
    fullName,
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
    user = await User.findOne({ username }).select(
      "_id username password isBan fullName"
    );
  } else {
    user = await User.findOne({ username }).select(
      "-password -isAdmin -isAccountVerified -email -passwordChangeAt -updatedAt -verify"
    );
  }
  if (!user) throw new Error("User not found || checkUsernameExist");

  return user;
};

const login = async (username) => {
  if (!username) throw new Error("Username is required || login");
  const user = await User.findOne({ username }).select(
    "-password -createdAt -updatedAt -_id -isAdmin -verify"
  );
  if (!user) throw new Error("User not found || login");
  return user;
};

const checkPassword = async (enterPass, user) => {
  if (!enterPass || !user)
    throw new Error("enterPass and user is required || checkPassword");
  const isMatched = await user.isPasswordMatched(enterPass);
  if (isMatched) return;
  throw new Error("Password not matched || checkPassword");
};

const checkUserBanned = (user) => {
  if (user?.isBan) throw new Error(`Access Denied ${user?.fullName} is banned`);
};

const checkUserVerified = (user) => {
  if (user?.isAccountVerified)
    throw new Error(
      `Access Denied ${user?.fullName}, you must verify your identity`
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
  const followingUser = await User.findByIdAndUpdate(
    followId,
    {
      // append a specified value to an array
      // Docs: https://www.mongodb.com/docs/manual/reference/operator/update/push/
      $push: { "info.followers": loginUserId },
    },
    { new: true }
  );

  // 2. Update the login user following field
  const currentUser = await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { "info.following": followId },
    },
    { new: true }
  );
  return {
    followers: followingUser?.info?.followers,
    following: currentUser?.info?.following,
  };
};

const unFollowing = async (loginUserId, unFollowId) => {
  if (!loginUserId || !unFollowId)
    throw new Error("loginUserId and unFollowId is required || unFollowing");
  const followingUser = await User.findByIdAndUpdate(
    unFollowId,
    {
      // remove all instances of value match
      // Docs: https://www.mongodb.com/docs/manual/reference/operator/update/pull/
      $pull: { "info.followers": loginUserId },
    },
    { new: true }
  );

  const currentUser = await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { "info.following": unFollowId },
    },
    { new: true }
  );
  return {
    followers: followingUser?.info?.followers,
    following: currentUser?.info?.following,
  };
};

const getFollowersByUsername = async (username, page, query) => {
  if (!username || !page)
    throw new Error("Username or page is required || getFollowersByUsername");
  const user = await User.findOne({ username })
    .select("info.followers")
    .populate("info.followers");
  if (!user) throw new Error("User not found || getFollowersByUsername");

  const limit = USERS_PER_PAGE;

  const result = await paginationWithArray({
    list: user?.info?.followers,
    page,
    limit,
    callback: takeBasicInfo,
    filterCallback: filterUserList,
    query,
  });

  return result;
};

const getFollowingByUsername = async (username, page, query) => {
  if (!username || !page)
    throw new Error("Username or page is required || getFollowingByUsername");
  const user = await User.findOne({ username })
    .select("info.following")
    .populate("info.following");
  if (!user) throw new Error("User not found || getFollowingByUsername");

  const limit = USERS_PER_PAGE;

  const result = await paginationWithArray({
    list: user?.info?.following,
    page,
    limit,
    callback: takeBasicInfo,
    filterCallback: filterUserList,
    query,
  });

  return result;
};

// Filter & search
const filterUserList = (listUsers, query) => {
  const regex = new RegExp(`${query}`, "gis");

  const result = listUsers?.filter((user) => {
    return regex.test(user?.fullName) || regex.test(user?.username);
  });

  return result;
};

const takeBasicInfo = (listUsers) => {
  return listUsers?.map((user) => ({
    id: user?._id,
    bio: user?.info?.bio,
    followers: user?.info?.followers,
    following: user?.info?.following,
    profilePhoto: user?.profilePhoto,
    fullName: user?.fullName,
    username: user?.username,
    isPrivateAccount: user?.setting?.isPrivateAccount,
  }));
};

const checkEmail = async (email) => {
  if (!email) throw new Error("Email Address is required || checkEmail");
  const user = await User.findOne({ email }).select("-password");
  if (!user) throw new Error("User Not Found || checkEmail");

  return user;
};

const resetPassword = async (token, password) => {
  if (!token || !password)
    throw new Error("Token and password is required || resetPassword");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    "verify.passwordResetToken": hashedToken,
    "verify.passwordResetExpires": { $gt: Date.now() },
  }).select("password");

  if (!user)
    throw new Error("Token expired or wrong, try again later || resetPassword");

  // Check similar with old password
  const isMatched = await user.isPasswordMatched(password);
  if (isMatched)
    throw new Error("Your new password is to similar to your current password");

  user.password = password;
  user.passwordChangeAt = new Date();
  user.verify.passwordResetExpires = undefined;
  user.verify.passwordResetToken = undefined;
  await user.save();
};

const changePassword = async (userId, currentPass, newPass) => {
  if (!userId || !currentPass || !newPass)
    throw new Error(
      "userId, currentPass and newPass is required || changePassword"
    );

  // Check identical password
  if (currentPass === newPass)
    throw new Error("New password must different to current password");

  const user = await User.findById(userId);

  // Check current pass
  const isMatched = await user.isPasswordMatched(currentPass);
  if (!isMatched) throw new Error("Current password is wrong");

  // Check similar with old password
  const isSimilar = await user.isPasswordMatched(newPass);
  if (isSimilar)
    throw new Error("Your new password is to similar to your current password");

  user.password = newPass;
  user.passwordChangeAt = new Date();
  await user.save();
};

const changePrivateSetting = async (userId, isPrivate) => {
  if (!userId || isPrivate === undefined)
    throw new Error("userId and isPrivate is required || changePrivateSetting");

  await User.findByIdAndUpdate(
    userId,
    {
      "setting.isPrivateAccount": !!isPrivate,
    },
    {
      new: true,
    }
  );
};

const verifyAccount = async (token) => {
  if (!token) throw new Error("Token is required || verifyAccount");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find this user by token
  const userFound = await User.findOne({
    "verify.accountVerificationToken": hashedToken,
    "verify.accountVerificationTokenExpires": { $gt: Date.now() },
  });

  if (!userFound)
    throw new Error("Token expired or wrong, try again later || verifyAccount");

  userFound.isAccountVerified = true;
  userFound.verify.accountVerificationToken = undefined;
  userFound.verify.accountVerificationTokenExpires = undefined;
  await userFound.save();
};

const changeProfile = async (userId, file, oldProfilePhoto) => {
  if (!userId || !file)
    throw new Error("userId or file is required || changeProfile");

  const imgUploaded = await uploadPhotoToCloudinary(file);

  await User.findByIdAndUpdate(
    userId,
    {
      profilePhoto: imgUploaded?.url,
    },
    {
      new: true,
    }
  );

  // Remove old profile photo from cloudinary
  const fileName = getPublicId(oldProfilePhoto);
  if (fileName?.startsWith("blank_profile")) return;

  await deleteCloudinaryPhotoById(fileName);

  return imgUploaded?.url;
};

const getPopularUsers = async () => {
  const users = await Project.distinct("user");

  let result = [];

  // for (let i = 0; i < users.length; i++) {
  //   const projectCount = await Project.find({ user: users[i] }).count();

  //   const userInfo = await User.findById(users[i]);

  //   if (userInfo)
  //     result.push({
  //       count: projectCount,
  //       user: {
  //         fullName: userInfo?.fullName,
  //         username: userInfo?.username,
  //         profilePhoto: userInfo?.profilePhoto,
  //       },
  //     });
  // }

  // Faster than for loop
  for (let userId of users) {
    const projectCount = await Project.find({ user: userId }).count();

    const userInfo = await User.findById(userId);

    result.push({
      count: projectCount,
      user: {
        fullName: userInfo?.fullName,
        username: userInfo?.username,
        profilePhoto: userInfo?.profilePhoto,
      },
    });
  }

  // Sort to desc
  result.sort((a, b) => (a.count > b.count ? -1 : b.count > a.count ? 1 : 0));

  return result;
};

//// [ADMIN]
const banUser = async (userId) => {
  if (!userId) throw new Error("userId is required || banUser");

  await User.findOneAndUpdate({ id: userId }, [
    { $set: { isBan: { $not: "$isBan" } } },
  ]);
};

const getUserByEmail = async (email) => {
  if (!email) throw new Error("email is required || banUser");
  const user = await User.findOne({ email }).select(
    "-password -info -setting -verify"
  );
  if (!user) throw new Error("User not found || getUserByEmail");

  return user;
};

const getUserById = async (userId) => {
  if (!userId) throw new Error("userId is required || banUser");
  const user = await User.findById(userId).select(
    "-password -info -setting -verify"
  );
  if (!user) throw new Error("User not found || getUserById");

  return user;
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
  getFollowersByUsername,
  getFollowingByUsername,
  checkEmail,
  resetPassword,
  verifyAccount,
  changeProfile,
  banUser,
  getUserByEmail,
  getUserById,
  login,
  changePassword,
  changePrivateSetting,
  getPopularUsers,
};
