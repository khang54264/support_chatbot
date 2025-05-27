// filepath: d:\DATN\supportchatbot\backend\controllers\chatSessionController.js
const ChatSession = require('../models/chatsession');
const ChatMessage = require('../models/chatmessage');

// Get all Chat Sessions for a user
exports.getAllChatSessionsForUser = async (req, res) => {
  try {
    const userId = req.user.userId; // Get user ID from JWT
    const chatSessions = await ChatSession.find({ uid: userId })
      .sort({ timestamp: -1 }) // Sort by timestamp in descending order
      .limit(10); // Limit to the most recent 10 sessions

    res.send(chatSessions);
  } catch (error) {
    console.error("Error getting chat sessions:", error);
    res.status(500).send(error);
  }
};

// Get a Chat Session by ID and populate messages
exports.getChatSessionById = async (req, res) => {
  try {
    const chatsession = await ChatSession.findById(req.params.id);
    console.log("Chat session found:", chatsession);

    if (!chatsession) {
      console.log("Chat session unfound:");
      return res.status(404).send();
    }

    // Populate the messages array
    await chatsession.populate({
      path: 'messages',
      model: 'chatMessage',
      options: { sort: { timestamp: 1 } }
    });
    console.log("Chat session populated with messages:", chatsession.messages);

    res.send(chatsession);
  } catch (error) {
    console.error("Error getting chat session by ID:", error);
    res.status(500).send(error);
  }
};

// Delete a chat session by ID
exports.deleteChatSession = async (req, res) => {
  try {
    const chatsession = await ChatSession.findByIdAndDelete(req.params.id);
    if (!chatsession) {
      return res.status(404).send();
    }
    res.send({ message: 'Chat Session deleted' });
  } catch (error) {
    console.error("Error deleting chat session:", error);
    res.status(500).send(error);
  }
};