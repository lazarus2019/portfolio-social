const cloudinary = require("cloudinary").v2; // Must using v2
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_SECRET_KEY, CLOUDINARY_KEY } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
  secure: true,
});

module.exports = cloudinary;
