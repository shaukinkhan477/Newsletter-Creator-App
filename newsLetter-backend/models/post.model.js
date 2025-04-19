const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    preheader: { type: String, default: "" },
    content: { type: String, default: "" },

    // "draft", "scheduled", "sent"
    status: { type: String, default: "draft" },

    // If user schedules this for later
    scheduledAt: { type: Date, default: null },

    // When the newsletter was actually sent
    sentAt: { type: Date, default: null },

    // **Associate with user**
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
