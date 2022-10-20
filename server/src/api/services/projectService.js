const Project = require("../models/projectModel");
const User = require("../models/userModel");
const {
  uploadPhotoToCloudinary,
  deleteCloudinaryPhotoById,
} = require("../utils/cloudinaryUploadPhoto");
const { getPublicId } = require("../utils/uploadFile");
const checkBadWords = require("../utils/badWords");
const {
  uploadVideoToCloudinary,
  deleteCloudinaryVideoById,
} = require("../utils/cloudinaryUploadVideo");

const isOwnerProject = async (userId, projectId) => {
  if (!projectId || !userId)
    throw new Error("projectId or userId is required || isOwnerProject");

  const project = await Project.findById(projectId).select("user");
  if (!project) throw new Error("Project Not Found || isOwnerProject");

  if (project?.user.toString() === userId.toString()) return;

  throw new Error("You not own this project || isOwnerProject");
};

const createProject = async (userId, fileThumbnail, projectInfo) => {
  if (!projectInfo || !userId || !fileThumbnail)
    throw new Error(
      "projectInfo, userId or fileThumbnail is required || createProject"
    );

  const isProfane = checkBadWords(
    projectInfo.title,
    projectInfo.shortDescription
  );

  if (isProfane)
    throw new Error(
      "Content contains bad words, please remove it and try again || createProject"
    );

  const imgUploaded = await uploadPhotoToCloudinary(fileThumbnail);

  await Project.create({
    user: userId,
    title: projectInfo.title,
    thumbnail: imgUploaded?.url,
    shortDescription: projectInfo.shortDescription,
  });
};

const getProjectBySlug = async (slug) => {
  if (!slug) throw new Error("slug is required || getProjectBySlug");
  const project = await Project.findOne({ slug, isHide: false }).populate(
    "user",
    "firstName lastName profilePhoto username info.bio"
  );

  if (!project) throw new Error("Project Not Found or Project Was Hidden");
  return project;
};

const getOwnProject = async (userId) => {
  if (!userId) throw new Error("userId is required || getOwnProject");
  const projectList = await Project.find({ user: userId });

  return projectList;
};

const getProjectByUsername = async (username) => {
  if (!username)
    throw new Error("username is required || getProjectByUsername");

  const user = await User.findOne({ username }).select("_id");
  if (!user) throw new Error("User Not Found || getProjectByUsername");

  const projectList = await Project.find({
    user: user?._id,
    isHide: false,
  }).select("-user");

  return projectList;
};

const savingProject = async (userId, projectId) => {
  if (!userId || !projectId)
    throw new Error("userId and projectId is required || savingProject");

  await User.findByIdAndUpdate(
    userId,
    {
      // append a specified value to an array
      // Docs: https://www.mongodb.com/docs/manual/reference/operator/update/push/
      $push: { "info.savedProject": projectId },
    },
    { new: true }
  );

  await Project.findByIdAndUpdate(
    projectId,
    {
      $inc: { starCount: 1 },
    },
    { new: true }
  );
};

const getSavedProject = async (listProjectIds) => {
  if (!listProjectIds)
    throw new Error("listProjectIds is required || getSavedProject");

  const projectList = await Project.find({
    _id: { $in: listProjectIds },
    isHide: false,
  }).populate("user", "firstName lastName username profilePhoto");

  return projectList;
};

const removeSavingProject = async (userId, projectId) => {
  if (!userId || !projectId)
    throw new Error("userId and projectId is required || savingProject");

  await User.findByIdAndUpdate(
    userId,
    {
      // append a specified value to an array
      // Docs: https://www.mongodb.com/docs/manual/reference/operator/update/push/
      $pull: { "info.savedProject": projectId },
    },
    { new: true }
  );

  await Project.findByIdAndUpdate(
    projectId,
    {
      $inc: { starCount: -1 },
    },
    { new: true }
  );
};

const hideProject = async (projectId) => {
  if (!projectId) throw new Error("projectId is required || hideProject");

  const project = await Project.findById(projectId);

  if (!project) throw new Error("Project Not Found || hideProject");

  if (project?.isHide) {
    project.isHide = false;
  } else {
    project.isHide = true;
  }

  await project.save();
};

const uploadPreviewVideo = async (
  projectId,
  previewVideo,
  oldPreviewVideoUrl
) => {
  if (!projectId || !previewVideo)
    throw new Error(
      "projectId or previewVideo is required || uploadPreviewVideo"
    );

  const video = await uploadVideoToCloudinary(previewVideo);
  if (!video)
    throw new Error("Can not upload your preview video || uploadPreviewVideo");

  await Project.findByIdAndUpdate(
    projectId,
    {
      "library.previewVideo": video?.url,
    },
    { new: true }
  );

  // Remove the old video - ERROR
  // if (oldPreviewVideoUrl) {
  //   const videoId = getPublicId(oldPreviewVideoUrl);
  //   await deleteCloudinaryVideoById(videoId);
  // }
};

//// [ADMIN]
const getAllProject = async (page) => {
  const projectList = await Project.find()
    .populate("user", "firstName lastName profilePhoto username info.bio")
    .limit(10)
    .skip(10 * (Number(page) - 1));

  return projectList;
};

module.exports = {
  createProject,
  getProjectBySlug,
  getOwnProject,
  getProjectByUsername,
  isOwnerProject,
  savingProject,
  removeSavingProject,
  getSavedProject,
  hideProject,
  uploadPreviewVideo,
  getAllProject,
};
