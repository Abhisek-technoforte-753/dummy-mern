const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");
const authMiddleware = require("../middlewares/authmiddleware");

// Like a blog
router.post("/", authMiddleware, likeController.likeBlog);

// Unlike a blog
router.delete("/", authMiddleware, likeController.unlikeBlog);

// Get likes for a specific blog
router.get("/blog/:blogId", likeController.getLikesByBlog);

// Check if current user has liked a specific blog
router.get("/check/:blogId", authMiddleware, likeController.checkUserLike);

// Get all likes (admin only)
router.get("/", authMiddleware, likeController.getAllLikes);

module.exports = router; 