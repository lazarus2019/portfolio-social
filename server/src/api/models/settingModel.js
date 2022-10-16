const mongoose = require("mongoose");
const schemaOptions = require("../../config/schemaOptions");

const settingSchema = new mongoose.Schema(
  {
    limitBoard: {
      type: Number,
      default: 20, // Maximum 20 boards/user
    },
    limitAttachmentStorage: {
      type: Number,
      default: 10, // 10MB
    },
    defaultProfilePhoto: {
      type: String,
      default:
        "https://res.cloudinary.com/amazona-app/image/upload/v1665804263/blank_profile_znhwkp.png",
    },
    contactEmail: {
      type: String,
      default: "freecodeweb2021@gmail.com",
    },
  },
  schemaOptions
);

const Setting = mongoose.model("Setting", settingSchema);
module.exports = Setting;
