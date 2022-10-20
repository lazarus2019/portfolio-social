const multer = require("multer");
const sharp = require("sharp");

// File type checking
const multerFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    // Rejected files
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

//// Profile Photo
const profilePhotoMulter = multer({
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 }, // 1MB
});

const profilePhotoResizing = async (req, res, next) => {
  // Check if there is no file
  if (!req.file) return next();
  const buffer = await sharp(req.file.buffer)
    .resize(250, 250)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toBuffer();

  req.file.bufferResizing = buffer;
  next();
};

//// Project thumbnail
const projectThumbnailMulter = multer({
  fileFilter: multerFilter,
  limits: { fileSize: 4000000 }, // 4MB
});

const projectThumbnailResizing = async (req, res, next) => {
  // Check if there is no file
  if (!req.file) return next();
  const buffer = await sharp(req.file.buffer)
    .resize(640, 360)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toBuffer();

  req.file.bufferResizing = buffer;
  next();
};

module.exports = {
  profilePhotoMulter,
  profilePhotoResizing,
  projectThumbnailMulter,
  projectThumbnailResizing,
};
