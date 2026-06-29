const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Invalid email"],
    },
    password: {
      type: String,
      required: function () {
        // only require a password if no oauthProvider
        return !this.oauthProvider;
      },
      minlength: 8,
    },
    oauthProvider: {
      type: String,
      default: null,
    },
    oauthId: {
      type: String,
      default: null,
    },

    // For reset password
    passwordResetToken: String,
    passwordResetExpires: Date,
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
