const multer = require("multer");

// File type checking
const multerFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith("video")) {
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
const previewVideoMulter = multer({
  dest: "uploads/",
  fileFilter: multerFilter,
  limits: { fileSize: 10000000 }, // 10MB
});

module.exports = {
  previewVideoMulter,
};
