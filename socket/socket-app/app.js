require('dotenv').config();
const express = require('express');
const http = require('http'); // required for Socket.IO
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const userSocketHandler = require('./socketHandlers/userSocket');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

// Register user socket handlers

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  userSocketHandler(io, socket);
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Connect to DB first, then start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to DB:', err);
});
