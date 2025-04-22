const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, default: "" },
    status: { type: String, default: "active" },

    // **Associate with user**
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// (Optional) enforce one email per user:
// subscriberSchema.index({ user: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("Subscriber", subscriberSchema);
