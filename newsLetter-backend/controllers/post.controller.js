const Post = require("../models/post.model");
const Subscriber = require("../models/subscriber.model");
const nodemailer = require("nodemailer");
require("dotenv").config();

// configure your transporter (SMTP etc.)
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
    const { title, subject, preheader, content, status, scheduledAt } = req.body;

    const newPost = await Post.create({
      title,
      subject,
      preheader,
      content,
      status: status || "draft",
      scheduledAt: scheduledAt || null,
      user: req.user.id,       // ← associate
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

    // fetch only your post
    const post = await Post.findOne({ _id: postId, user: req.user.id });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // fetch only your active subscribers
    const subscribers = await Subscriber.find({
      user: req.user.id,
      status: "active"
    });

    // send
    for (const sub of subscribers) {
      await transporter.sendMail({
        from: `"Newsletter App" <${process.env.EMAIL_USER}>`,
        to: sub.email,
        subject: post.subject,
        text: `${post.preheader}\n\n${post.content}`,
        html: `<p>${post.preheader}</p>${post.content}`,
      });
    }

    post.status = "sent";
    post.sentAt = new Date();
    await post.save();

    return res.json({ message: "Post sent successfully!", post });
  } catch (error) {
    console.error("Send Now error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// 3) GET ALL POSTS (yours only)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    return res.json({ posts });
  } catch (error) {
    console.error("GetAllPosts error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// 4) GET SINGLE POST (yours only)
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json({ post });
  } catch (error) {
    console.error("GetPostById error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// 5) UPDATE Post (yours only)
exports.updatePost = async (req, res) => {
  try {
    const { title, subject, preheader, content, status, scheduledAt } = req.body;

    const updated = await Post.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, subject, preheader, content, status, scheduledAt },
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
