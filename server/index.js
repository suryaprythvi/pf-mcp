import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { agent } from './agent.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3010",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle chat messages
  socket.on('chat_message', async (data) => {
    try {
      const { message, userId } = data;
      console.log(`Received message from ${userId}: ${message}`);

      // Send user message to client immediately
      socket.emit('chat_response', {
        type: 'user',
        message: message,
        timestamp: new Date().toISOString(),
        userId: userId
      });

      // Process message with MCP servers
      const response = await agent.run(message);

      // Send AI response back to client
      socket.emit('chat_response', {
        type: 'assistant',
        message: response,
        timestamp: new Date().toISOString(),
        userId: 'assistant'
      });

    } catch (error) {
      console.error('Error processing message:', error);
      socket.emit('chat_response', {
        type: 'error',
        message: 'Sorry, I encountered an error processing your request.',
        timestamp: new Date().toISOString(),
        userId: 'system'
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Initialize and start server
const PORT = process.env.PORT || 5010;

const startServer = async () => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Socket.IO server ready for connections`);
  });
};

startServer().catch(console.error);
