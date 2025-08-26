require('dotenv').config();
const express = require('express');
require("dotenv").config()
const cors = require('cors');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// Home route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to E-commerce API',
    documentation: '/api-docs',
    status: 'Server is running'
  });
});

app.use('/api/products', productRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/orders',orderRoutes);

connectDB().then(()=>{
  app.listen(PORT,()=>{
      console.log("server is running at 5000");
  })
  });