const mongoose = require("mongoose");
const schemaOptions = require("../../config/schemaOptions");

const boardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    icon: {
      type: String,
      default: "📃",
    },
    title: {
      type: String,
      default: "Untitled",
    },
    description: {
      type: String,
      default: `Add description here
        You can add multiline description
        Let's start...`,
    },
    position: {
      type: Number,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    favoritePosition: {
      type: Number,
      default: 0,
    },
  },
  schemaOptions
);

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
