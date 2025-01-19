// routes/post.routes.js
const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

// Create a post (draft or schedule)
router.post("/", postController.createPost);

// Get all posts
router.get("/", postController.getAllPosts);

// Get single post
router.get("/:id", postController.getPostById);

// Update post (draft -> schedule)
router.put("/:id", postController.updatePost);

// Send now
router.post("/:postId/send", postController.sendNow);

module.exports = router;
