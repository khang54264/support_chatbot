// filepath: d:\DATN\supportchatbot\backend\routes\chatSessionRoute.js
const express = require('express');
const router = express.Router();
const chatSessionController = require('../controllers/chatSessionController');
const verifyToken = require('../middleware/authMiddleware');

// Get all chat sessions for a user
router.get('/chatSessions/user', verifyToken, chatSessionController.getAllChatSessionsForUser);

// Get a chat session by ID
router.get('/chatSessions/:id', verifyToken, chatSessionController.getChatSessionById);

// Delete a chat session by ID
router.delete('/chatSessions/:id', verifyToken, chatSessionController.deleteChatSession);

module.exports = router;