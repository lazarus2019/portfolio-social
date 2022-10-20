const Project = require("../models/projectModel");
const User = require("../models/userModel");
const {
  uploadPhotoToCloudinary,
} = require("../utils/cloudinaryUploadPhoto");
const checkBadWords = require("../utils/badWords");

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

module.exports = {
  createProject,
  getProjectBySlug,
  getOwnProject,
  getProjectByUsername,
};
