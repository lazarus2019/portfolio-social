const mongoose = require("mongoose");
const schemaOptions = require("../../config/schemaOptions");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    profilePhoto: {
      type: String,
      default:
        "https://res.cloudinary.com/amazona-app/image/upload/v1665804263/blank_profile_znhwkp.png",
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
    },
    passwordChangeAt: {
      type: Date,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBan: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    verify: {
      accountVerificationToken: {
        type: String,
      },
      accountVerificationTokenExpires: {
        type: Date,
      },
      passwordResetToken: {
        type: String,
      },
      passwordResetExpires: {
        type: Date,
      },
    },
    info: {
      bio: {
        type: String,
        default: "",
      },
      projectCount: {
        type: Number,
        default: 0,
      },
      externalLinks: {
        type: [
          {
            type: String,
          },
        ],
      },
      qrCode: {
        type: String, // Link to user profile (ex: domain/@username)
      },
      savedProject: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
          },
        ],
      },
      followers: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
      },
      following: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
      },
    },
    setting: {
      isPrivateAccount: {
        type: Boolean,
        default: false,
      },
    },
    oauth: {
      type: String,
    },
  },
  schemaOptions
);

// Hash password
userSchema.pre("save", async function (next) {
  if (this.oauth !== undefined) {
    next();
  }

  if (!this.isModified("password")) {
    next();
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hashSync(this.password, salt);
  next();
});

// Match password
// Docs: https://mongoosejs.com/docs/guide.html#methods
// Note: MUST USE Expression function [function(){}], can not use arrow func
userSchema.methods.isPasswordMatched = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = await crypto.randomBytes(32).toString("hex");
  this.verify.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.verify.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 mins
  return resetToken;
};

userSchema.methods.createAccountVerificationToken = async function () {
  const verificationToken = await crypto.randomBytes(32).toString("hex");
  this.verify.accountVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.verify.accountVerificationTokenExpires = Date.now() + 10 * 60 * 1000; // 10 mins
  return verificationToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
