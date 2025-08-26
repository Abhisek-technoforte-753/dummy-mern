
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Category description is required']
    },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Category', categorySchema);
