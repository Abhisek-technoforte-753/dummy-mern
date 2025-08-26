const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/authMiddleware');

router.get('/:id', orderController.getOrderById);
router.post('/',auth, orderController.createOrder);
router.put('/:id',auth, orderController.updateOrder);
router.delete('/:id',auth, orderController.deleteOrder);
router.get('/',auth, orderController.getOrders);

module.exports = router;
