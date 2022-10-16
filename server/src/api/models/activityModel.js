const mongoose = require("mongoose");
const schemaOptions = require("../../config/schemaOptions");

const activitySchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: [true, "Task id is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    type: {
      type: String, // file|link
    },
  },
  schemaOptions
);

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
