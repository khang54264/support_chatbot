const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

// Create a new chatbot
router.post('/chatbots', chatbotController.createChatbot);

module.exports = router;