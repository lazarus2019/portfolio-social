const mongoose = require("mongoose");
const schemaOptions = require("../../config/schemaOptions");

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
      // Add placeholder image here
    },
    tag: {
      type: Array,
    },
    languages: {
      type: Array,
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
    },
    library: {
      content: {
        type: String,
        default: "",
      },
      previewVideo: {
        type: String,
      },
      images: {
        type: Array,
      },
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
    },
    isHide: {
      type: Boolean,
      default: false,
    },
  },
  schemaOptions
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
