const cloudinaryConfig = require("../../config/cloudinary/cloudinaryConfig");
const fs = require("fs");

const uploadVideo = (path) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinaryConfig.uploader.upload(
      path,
      {
        resource_type: "video",
      },
      (error, result) => {
        if (error) reject(error);
        if (result) {
          fs.unlinkSync(path);
          resolve(result);
        }
      }
    );
  });
};

const uploadVideoToCloudinary = async (fileUpload) => {
  try {
    const { path } = fileUpload;

    const result = await uploadVideo(path);
    return { url: result?.secure_url };
  } catch (error) {
    throw new Error(error.toString());
  }
};

const deleteCloudinaryVideoById = async (id) => {
  try {
    await cloudinaryConfig.uploader.destroy(id, (result) => {
      console.log({ result });
    });
  } catch (error) {
    throw new Error(error.toString());
  }
};

module.exports = {
  uploadVideoToCloudinary,
  deleteCloudinaryVideoById,
};
