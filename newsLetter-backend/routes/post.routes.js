const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const { protect } = require("../middlewares/auth.middleware");

// **Protect all post routes**
router.use(protect);

// Create a post (draft or schedule)
router.post("/", postController.createPost);
// Get all posts (only yours)
router.get("/", postController.getAllPosts);
// Get single post (only if yours)
router.get("/:id", postController.getPostById);
// Update post (if yours)
router.put("/:id", postController.updatePost);
// Send now (if yours)
router.post("/:postId/send", postController.sendNow);

module.exports = router;
