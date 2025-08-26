
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/authMiddleware');

// Get user's cart
router.get('/', auth, cartController.getCart);

// Add or update item in cart
router.post('/items', auth, cartController.addOrUpdateCartItem);

// Remove item from cart
router.delete('/items/:productId', auth, cartController.removeCartItem);

// Clear cart
router.delete('/', auth, cartController.clearCart);

module.exports = router;