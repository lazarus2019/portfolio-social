const cloudinaryConfig = require("../../config/cloudinary/cloudinaryConfig");
const streamifier = require("streamifier");

const uploadFromBuffer = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinaryConfig.uploader.upload_stream(
      {},
      (error, result) => {
        if (result) resolve(result);
        reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

const uploadPhotoToCloudinary = async (fileUpload) => {
  try {
    // Convert Buffer to IMAGE and upload
    const result = await uploadFromBuffer(fileUpload.bufferResizing);
    return { url: result?.secure_url };
  } catch (error) {
    throw new Error(error.toString());
  }
};

const deleteCloudinaryPhotoById = async (id) => {
  try {
    await cloudinaryConfig.uploader.destroy(id, (result) => {
      console.log({ result });
    });
  } catch (error) {
    throw new Error(error.toString());
  }
};

module.exports = { uploadPhotoToCloudinary, deleteCloudinaryPhotoById };
