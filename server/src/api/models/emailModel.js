const mongoose = require("mongoose");
const schemaOptions = require("../../config/schemaOptions");

const emailSchema = new mongoose.Schema(
  {
    sendBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    to: {
      type: String,
      required: [true, "Receive address is required"],
    },
    from: {
      type: String,
      required: [true, "Send address is required"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
    },
  },
  schemaOptions
);

const Email = mongoose.model("Email", emailSchema);
module.exports = Email;
