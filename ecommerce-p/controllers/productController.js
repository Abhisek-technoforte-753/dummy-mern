const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const images = req.files ? req.files.map(file => file.path) : [];

        // Parse ratings from form-data if present
        let ratings = [];
        if (req.body.ratings) {
            try {
                ratings = JSON.parse(req.body.ratings);
            } catch (e) {
                ratings = [];
            }
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            images,
            ratings, // <-- use parsed ratings here
            createdBy: req.user.id
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        // Clean up uploaded files if there's an error
        if (req.files) {
            req.files.forEach(file => {
                fs.unlink(file.path, err => {
                    if (err) console.error('Error deleting file:', err);
                });
            });
        }
        res.status(400).json({ message: 'Error creating product', error: error.message });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const { category, search, sort } = req.query;
        const query = {};
        
        // Handle category filter
        if (category) {
            query.category = category;
        }

        // Handle search
        if (search) {
            query.$text = { $search: search };
        }

        // Handle sorting
        let sortOption = { createdAt: -1 };
        if (sort === 'price_asc') sortOption = { price: 1 };
        if (sort === 'price_desc') sortOption = { price: -1 };
        if (sort === 'name') sortOption = { name: 1 };

        const products = await Product.find(query)
            .populate('category', 'name description') // Populate category details
            .sort(sortOption);
            
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Get single product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update fields
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock = stock !== undefined ? stock : product.stock;

        // Handle new images if any
        if (req.files && req.files.length > 0) {
            // Delete old images
            product.images.forEach(image => {
                const imagePath = path.join(__dirname, '..', image);
                if (fs.existsSync(imagePath)) {
                    fs.unlink(imagePath, err => {
                        if (err) console.error('Error deleting old image:', err);
                    });
                }
            });
            // Add new images
            product.images = req.files.map(file => file.path);
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        // Clean up newly uploaded files if there's an error
        if (req.files) {
            req.files.forEach(file => {
                fs.unlink(file.path, err => {
                    if (err) console.error('Error deleting file:', err);
                });
            });
        }
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete associated images
        product.images.forEach(image => {
            const imagePath = path.join(__dirname, '..', image);
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, err => {
                    if (err) console.error('Error deleting image:', err);
                });
            }
        });

        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};