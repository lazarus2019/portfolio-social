const mongoose = require("mongoose");
const schemaOptions = require("../../config/schemaOptions");

const taskSchema = new mongoose.Schema(
  {
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: [true, "Section id is required"],
    },
    title: {
      type: String,
      default: "To do list",
    },
    icon: {
      type: String,
      default: "🟢",
    },
    content: {
      type: String,
      default: "",
    },
    position: {
      type: Number,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    attachmentCount: {
      type: Number,
      default: 0,
    },
    cover: {
      url: {
        type: String,
        default: null,
      },
      color: {
        type: String,
      },
    },
  },
  schemaOptions
);

const Task = mongoose.model("Task", taskSchema)
module.exports = Task