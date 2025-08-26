const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Protected Admin routes
router.post(
    '/',
    authMiddleware,
    upload.array('images', 5), // Max 5 images
    productController.createProduct
);

router.put(
    '/:id',
    // protect,
    authMiddleware,
    upload.array('images', 5),
    productController.updateProduct
);

router.delete('/:id', productController.deleteProduct);

module.exports = router;