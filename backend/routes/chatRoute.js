// filepath: d:\DATN\supportchatbot\backend\routes\chatRoute.js
const express = require('express');
const router = express.Router();
const { generateChatResponse } = require('../controllers/chatController');
const verifyToken = require('../middleware/authMiddleware'); // Import the middleware

router.post('/chat', verifyToken, generateChatResponse); // Apply the middleware

module.exports = router;