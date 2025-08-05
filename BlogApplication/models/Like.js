const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
    createdAt: { type: Date, default: Date.now() }
});

// Create a compound index to ensure a user can only like a blog once
likeSchema.index({ user: 1, blog: 1 }, { unique: true });

module.exports = mongoose.model("Like", likeSchema); 