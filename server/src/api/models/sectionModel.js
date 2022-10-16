const mongoose = require("mongoose");
const schemaOptions = require("../../config/schemaOptions");

const sectionSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: [true, "Board id is required"],
    },
    icon: {
      type: String,
      default: "🟡",
    },
    title: {
      type: String,
      default: "Untitled",
    },
    position: {
      type: Number,
    },
  },
  schemaOptions
);

const Section = mongoose.model('Section', sectionSchema)
module.exports = Section
