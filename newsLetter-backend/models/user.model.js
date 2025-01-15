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
      required: true,
      minlength: 6,
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
