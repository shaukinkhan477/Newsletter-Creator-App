const Post = require("../models/post.model");
const Subscriber = require("../models/subscriber.model");
const nodemailer = require("nodemailer");
require("dotenv").config();

/* 
  Create a transporter (for demonstration).
  Adjust to real SMTP credentials or use your existing transporter.
*/
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 1) CREATE Post (DRAFT or SCHEDULE)
exports.createPost = async (req, res) => {
  try {
    const { title, subject, preheader, content, status, scheduledAt } =
      req.body;

    const newPost = await Post.create({
      title,
      subject,
      preheader,
      content,
      status: status || "draft",
      scheduledAt: scheduledAt || null,
    });

    return res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    console.error("Create Post error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// 2) SEND NOW
exports.sendNow = async (req, res) => {
  try {
    const { postId } = req.params;

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Fetch all active subscribers
    const subscribers = await Subscriber.find({ status: "active" });

    // Actually send the emails
    // For brevity, we do a simple loop with nodemailer
    // Real usage might require a queue (Bull, RabbitMQ, etc.)
    for (const sub of subscribers) {
      await transporter.sendMail({
        from: `"Newsletter App" <${process.env.EMAIL_USER}>`,
        to: sub.email,
        subject: post.subject,
        text: `${post.preheader}\n\n${post.content}`,
        html: `<p>${post.preheader}</p>${post.content}`,
      });
    }

    // Update the post to "sent"
    post.status = "sent";
    post.sentAt = new Date();
    await post.save();

    return res.json({ message: "Post sent successfully!", post });
  } catch (error) {
    console.error("Send Now error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// 3) LIST / GET ALL POSTS
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.json({ posts });
  } catch (error) {
    console.error("GetAllPosts error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// 4) GET SINGLE POST
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json({ post });
  } catch (error) {
    console.error("GetPostById error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// 5) UPDATE Post (e.g., from draft to schedule)
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subject, preheader, content, status, scheduledAt } =
      req.body;
    const updated = await Post.findByIdAndUpdate(
      id,
      {
        title,
        subject,
        preheader,
        content,
        status,
        scheduledAt,
      },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json({ message: "Post updated", post: updated });
  } catch (error) {
    console.error("Update Post error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
