const express = require('express');
const router = express.Router();
const chatMessageController = require('../controllers/chatMessageController');

// Create a new message
router.post('/chatMessages', chatMessageController.createChatMessage);

// Get all messages
router.get('/chatMessages', chatMessageController.getAllChatMessages);

// Get a message by ID
router.get('/chatMessages/:id', chatMessageController.getChatMessageById);

// Update a message by ID
router.put('/chatMessages/:id', chatMessageController.updateChatMessage);

// Delete a message by ID
router.delete('/chatMessages/:id', chatMessageController.deleteChatMessage);

module.exports = router;