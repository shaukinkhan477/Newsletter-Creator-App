const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 180 },
    subject: { type: String, required: true, trim: true, maxlength: 180 },
    preheader: { type: String, default: "", trim: true, maxlength: 250 },
    content: { type: String, default: "" },

    // "draft", "scheduled", "sent"
    status: { type: String, enum: ["draft", "scheduled", "sent"], default: "draft" },

    // If user schedules this for later
    scheduledAt: { type: Date, default: null },

    // When the newsletter was actually sent
    sentAt: { type: Date, default: null },

    // **Associate with user**
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

postSchema.index({ user: 1, createdAt: -1 });
postSchema.index({ status: 1, scheduledAt: 1 });

module.exports = mongoose.model("Post", postSchema);
