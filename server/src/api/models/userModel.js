const mongoose = require("mongoose");
const schemaOptions = require("../../config/schemaOptions");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
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
      },
      DOB: {
        type: Date,
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
      follower: {
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

const User = mongoose.model("User", userSchema);
module.exports = User;
