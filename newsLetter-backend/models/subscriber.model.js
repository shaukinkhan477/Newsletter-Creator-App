const mongoose = require("mongoose");
const validator = require("validator");

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Invalid subscriber email"],
    },
    name: { type: String, default: "", trim: true, maxlength: 120 },
    status: {
      type: String,
      enum: ["active", "inactive", "pending", "needs_approval"],
      default: "active",
    },

    // **Associate with user**
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

subscriberSchema.index({ user: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("Subscriber", subscriberSchema);
