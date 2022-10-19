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
} = require("../services/userService");
const {
  sendResetPasswordEmail,
  sendFeedbackEmail,
  sendVerificationEmail,
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

    if (user?._id.toString() === followId.toString())
      throw new Error("You can not following yourself");

    const alreadyFollowing = user?.info?.following?.find(
      (user) => user?.toString() === followId.toString()
    );

    if (alreadyFollowing) {
      unFollowing(user?._id, followId);
    } else {
      following(user?._id, followId);
    }
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Get list followers
const userFollowersListCtrl = expressAsyncHandler(async (req, res) => {
  const { username } = req.params;
  try {
    const listFollowers = await getFollowersByUsername(username);
    res.status(200).json({ listFollowers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Get list following
const userFollowingListCtrl = expressAsyncHandler(async (req, res) => {
  const { username } = req.params;
  try {
    const listFollowing = await getFollowingByUsername(username);
    res.status(200).json({ listFollowing });
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
    const url = `reset-password/${token}`;

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
  const { email, firstName, lastName } = req?.user;
  const { content } = req?.body;
  try {
    await sendFeedbackEmail({ email, firstName, lastName }, content);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Upload & change profile photo
const userProfilePhotoUploadCtrl = expressAsyncHandler(async (req, res) => {
  const { _id, profilePhoto } = req?.user;
  try {
    await changeProfile(_id, req.file, profilePhoto);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
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
};
