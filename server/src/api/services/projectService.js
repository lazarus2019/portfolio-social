const Project = require("../models/projectModel");
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

module.exports = {
  createProject,
};
