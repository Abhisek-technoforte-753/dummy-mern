
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        // Get user ID from auth middleware
        req.body.user = req.user.id;
        
        // Create order with request body
        const order = await Order.create(req.body);
        
        // Return the created order
        res.status(201).json(order);
        
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: error.message });
    }
};



exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email') // Include user details
            .populate({
                path: 'products.product',
                select: 'name price image',
                populate: {
                    path: 'category',
                    select: 'name'
                }
            });
            
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Calculate total amount
        const totalAmount = order.products.reduce((total, item) => {
            return total + (item.quantity * item.product.price);
        }, 0);
        
        // Add total amount to the order object
        const orderWithTotal = {
            ...order.toObject(),
            totalAmount
        };
        
        res.json(orderWithTotal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate({
                path: 'user',
                model: 'User',
                select: 'name email username',
                options: { strictPopulate: false }
            })
            .populate({
                path: 'products.product',
                model: 'Product',
                select: 'name price image description',
                populate: {
                    path: 'category',
                    model: 'Category',
                    select: 'name'
                }
            })
            .sort({ createdAt: -1 });

        // Calculate total amount for each order and format the response
        const formattedOrders = orders.map(order => ({
            ...order.toObject(),
            totalAmount: order.products.reduce((total, item) => {
                return total + (item.quantity * item.product.price);
            }, 0)
        }));

        res.json(formattedOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: error.message });
    }
};
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};