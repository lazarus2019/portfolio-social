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
  getFollowersByUsername,
  getFollowingByUsername,
  checkEmail,
  resetPassword,
  changeProfile,
  banUser,
  getUserByEmail,
  getUserById,
  login,
  verifyAccount,
  changePassword,
  changePrivateSetting,
} = require("../services/userService");
const {
  sendResetPasswordEmail,
  sendFeedbackEmail,
  sendVerificationEmail,
  replyFeedbackEmail,
} = require("../services/sendMailService");
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
  const { username, password } = req?.body;
  try {
    const user = await checkUsernameExist(username, true);

    await checkUserBanned(user);

    await checkPassword(password, user);

    const token = generateToken({ username, id: user?._id });
    res.setHeader("Authorization", token);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Get user info by token
const userGetByTokenCtrl = expressAsyncHandler(async (req, res) => {
  const user = req?.user;
  try {
    if (user)
      res.status(200).json({
        id: user?._id,
        username: user?.username,
        fullName: user?.fullName,
        email: user?.email,
        isBan: user?.isBan,
        bio: user?.info?.bio,
        following: user?.info?.following,
        savedProject: user?.info?.savedProject,
        profilePhoto: user?.profilePhoto,
        isAccountVerified: user?.isAccountVerified,
        isPrivateAccount: user?.setting?.isPrivateAccount,
      });
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
      fullName: userUpdated.fullName,
      bio: userUpdated.info.bio,
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
    let result = null;

    if (user?._id.toString() === followId.toString())
      throw new Error("You can not following yourself");

    const alreadyFollowing = user?.info?.following?.find(
      (user) => user?.toString() === followId.toString()
    );

    if (alreadyFollowing) {
      result = await unFollowing(user?._id, followId);
    } else {
      result = await following(user?._id, followId);
    }
    res.status(200).json({ status: true, result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Get list followers
const userFollowersListCtrl = expressAsyncHandler(async (req, res) => {
  const { username } = req.params;
  const { page = 1, q } = req?.query;
  try {
    const listFollowers = await getFollowersByUsername(username, page, q);
    res.status(200).json(listFollowers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Get list following
const userFollowingListCtrl = expressAsyncHandler(async (req, res) => {
  const { username } = req.params;
  const { page = 1, q } = req?.query;
  try {
    const listFollowing = await getFollowingByUsername(username, page, q);
    res.status(200).json(listFollowing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Forget password token generator
const userForgetPasswordCtrl = expressAsyncHandler(async (req, res) => {
  const { email } = req?.body;
  try {
    const user = await checkEmail(email);

    const token = await user.createPasswordResetToken();
    const url = `reset-password/${token}`;

    await user.save();

    await sendResetPasswordEmail(email, url);

    res.status(200).json({
      msg: `A reset password message is successfully send to ${email}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Password reset
const userResetPasswordCtrl = expressAsyncHandler(async (req, res) => {
  const { token, password } = req?.body;
  try {
    await resetPassword(token, password);
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Verify Account token generator
const userVerifyTokenCtrl = expressAsyncHandler(async (req, res) => {
  const { email } = req?.user;
  try {
    const user = await checkEmail(email);

    const token = await user.createAccountVerificationToken();
    const url = `verify-account/${token}`;

    await user.save();

    await sendVerificationEmail(email, url);
    res.status(200).json({
      msg: `A verification message is successfully send to ${email}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Verify Account by token
const userVerifyAccountCtrl = expressAsyncHandler(async (req, res) => {
  const { token } = req?.body;
  try {
    await verifyAccount(token);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Send feedback to admin contact
const userFeedbackCtrl = expressAsyncHandler(async (req, res) => {
  const { email, fullName, message } = req?.body;
  try {
    await sendFeedbackEmail({ email, fullName }, message);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Upload & change profile photo
const userProfilePhotoUploadCtrl = expressAsyncHandler(async (req, res) => {
  const { _id, profilePhoto } = req?.user;
  try {
    const newProfilePhoto = await changeProfile(_id, req.file, profilePhoto);

    res.status(200).json({ profilePhoto: newProfilePhoto });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Change password
const userChangePasswordCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { currentPass, newPass } = req?.body;
  try {
    await changePassword(_id, currentPass, newPass);
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Change private account setting
const userChangePrivateSettingCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { isPrivate } = req?.body;

  try {
    await changePrivateSetting(_id, isPrivate);
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const userBanningCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { userId } = req?.body;
  try {
    if (_id.toString() === userId.toString())
      throw new Error("You can not banning yourself!");

    await banUser(userId);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const userGetByEmailCtrl = expressAsyncHandler(async (req, res) => {
  const { email } = req?.body;
  try {
    const user = await getUserByEmail(email);

    res.status(200).json({ result: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const userGetByIdCtrl = expressAsyncHandler(async (req, res) => {
  const { userId } = req?.body;
  validateMongoDbID(userId);
  try {
    const user = await getUserById(userId);

    res.status(200).json({ result: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// ADMIN
const userReplyFeedbackCtrl = expressAsyncHandler(async (req, res) => {
  const { email, fullName, message } = req?.body;
  try {
    await replyFeedbackEmail({ email, fullName }, message);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  userGetByTokenCtrl,
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
  userReplyFeedbackCtrl,
  userChangePasswordCtrl,
  userChangePrivateSettingCtrl,
};
