
const Cart = require('../models/Cart');
const Product = require('../models/Product');


exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id })
            .populate({
                path: 'products.product',
                populate: {
                    path: 'category',
                    model: 'Category'
                }
            });

        if (!cart) {
            return res.status(200).json({
                _id: null,
                user: req.user._id,
                products: [],
                totalAmount: 0
            });
        }

        // Calculate total amount
        const totalAmount = cart.products.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);

        res.json({
            ...cart._doc,
            totalAmount
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
};

// Add or update item in cart
exports.addOrUpdateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        if (!productId || !quantity || quantity < 1) {
            return res.status(400).json({ message: 'Product ID and valid quantity are required' });
        }

        // Verify product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            // Create new cart if it doesn't exist
            cart = new Cart({
                user: req.user.id,
                products: [{ product: productId, quantity }]
            });
        } else {
            // Check if product already in cart
            const productIndex = cart.products.findIndex(
                item => item.product.toString() === productId
            );

            if (productIndex > -1) {
                // Update quantity if product exists in cart
                cart.products[productIndex].quantity = quantity;
            } else {
                // Add new product to cart
                cart.products.push({ product: productId, quantity });
            }
        }

        await cart.save();
        
        const populatedCart = await cart.populate({
            path: 'products.product',
            populate: { path: 'category', model: 'Category' }
        });

        // Calculate total amount
        const totalAmount = populatedCart.products.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);

        res.status(200).json({
            ...populatedCart._doc,
            totalAmount
        });

    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'Error updating cart', error: error.message });
    }
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        
        const cart = await Cart.findOne({ user: req.user._id });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove product from cart
        cart.products = cart.products.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();
        
        const populatedCart = await cart.populate({
            path: 'products.product',
            populate: { path: 'category', model: 'Category' }
        });

        // Calculate total amount
        const totalAmount = populatedCart.products.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);

        res.status(200).json({
            ...populatedCart._doc,
            totalAmount
        });

    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Error removing item from cart', error: error.message });
    }
};



exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ user: req.user._id });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'Error clearing cart', error: error.message });
    }
};