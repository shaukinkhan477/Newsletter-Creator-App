const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    required: function () {
        // only require a password if no oauthProvider
        return !this.oauthProvider;
      },
    minlength: 6,
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
