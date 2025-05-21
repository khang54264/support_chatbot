const express = require('express');
const router = express.Router();
const chatSessionController = require('../controllers/chatSessionController');

// Create a new chat Session
router.post('/chatSessions', chatSessionController.createChatSession);

// Get all chat Sessions
router.get('/chatSessions', chatSessionController.getAllChatSessions);

// Get a chat Session by ID
router.get('/chatSessions/:id', chatSessionController.getChatSessionById);

// Update a chat Session by ID
router.put('/chatSessions/:id', chatSessionController.updateChatSession);

// Delete a chat Session by ID
router.delete('/chatSessions/:id', chatSessionController.deleteChatSession);

module.exports = router;