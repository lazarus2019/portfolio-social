const mongoose = require("mongoose");
const schemaOptions = require("../../config/schemaOptions");

const attachmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: [true, "Task id is required"],
    },
    title: {
      type: String,
    },
    type: {
      type: String, // file|link
    },
    url: {
      type: String, // Upload to cloudinary and get the url
    },
    fileExtension: {
      type: String,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  schemaOptions
);

const Attachment = mongoose.model("Attachment", attachmentSchema);
module.exports = Attachment;
