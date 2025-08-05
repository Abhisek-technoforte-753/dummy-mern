const Like = require("../models/Like");
const Blog = require("../models/Blogs");

// Like a blog
exports.likeBlog = async (req, res) => {
    try {
        const { blog, user } = req.body;
        // Check if blog exists
        const blogDoc = await Blog.findById(blog);
        if (!blogDoc) {
            return res.status(404).json({ message: "Blog not found" });
        }
        // Check if user already liked this blog
        const existingLike = await Like.findOne({ user, blog });
        if (existingLike) {
            return res.status(400).json({ message: "You have already liked this blog" });
        }
        // Create new like
        const like = new Like({ user, blog });
        await like.save();
        // Add like to blog's likes array
        blogDoc.likes.push(like._id);
        await blogDoc.save();
        // Populate user info
        await like.populate("user", "username");
        res.status(201).json({ 
            message: "Blog liked successfully", 
            like,
            totalLikes: blogDoc.likes.length 
        });
    } catch (err) {
        console.error("Error in likeBlog:", err);
        res.status(400).json({ message: "Like operation failed", error: err.message });
    }
};

// Unlike a blog
exports.unlikeBlog = async (req, res) => {
    try {
        const { blog, user } = req.body;
        // Check if blog exists
        const blogDoc = await Blog.findById(blog);
        if (!blogDoc) {
            return res.status(404).json({ message: "Blog not found" });
        }
        // Find and delete the like
        const like = await Like.findOneAndDelete({ user, blog });
        if (!like) {
            return res.status(400).json({ message: "You haven't liked this blog" });
        }
        // Remove like from blog's likes array
        blogDoc.likes = blogDoc.likes.filter(likeId => likeId.toString() !== like._id.toString());
        await blogDoc.save();
        res.status(200).json({ 
            message: "Blog unliked successfully", 
            totalLikes: blogDoc.likes.length 
        });
    } catch (err) {
        console.error("Error in unlikeBlog:", err);
        res.status(400).json({ message: "Unlike operation failed", error: err.message });
    }
};

// Get likes for a specific blog
exports.getLikesByBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        const likes = await Like.find({ blog: blogId })
            .populate("user", "username")
            .populate("blog", "title");

        res.status(200).json({ 
            likes,
            totalLikes: likes.length 
        });

    } catch (err) {
        console.error("Error in getLikesByBlog:", err);
        res.status(400).json({ message: "Failed to get likes", error: err.message });
    }
};

// Get all likes (for admin purposes)
exports.getAllLikes = async (req, res) => {
    try {
        const likes = await Like.find()
            .populate("user", "username")
            .populate("blog", "title");

        res.status(200).json({ likes });

    } catch (err) {
        console.error("Error in getAllLikes:", err);
        res.status(400).json({ message: "Failed to get likes", error: err.message });
    }
};

// Check if current user has liked a specific blog
exports.checkUserLike = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user.id;

        const like = await Like.findOne({ user: userId, blog: blogId });
        
        res.status(200).json({ 
            hasLiked: !!like,
            like: like || null
        });

    } catch (err) {
        console.error("Error in checkUserLike:", err);
        res.status(400).json({ message: "Failed to check like status", error: err.message });
    }
}; 