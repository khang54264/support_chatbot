const ChatSession = require('../models/chatsession');

// Create a new Chat Session
exports.createChatSession = async (req, res) => {
  try {
    const chatsession = new ChatSession(req.body);
    await chatsession.save();
    res.status(201).send(query);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all Chat Sessions
exports.getAllChatSessions = async (req, res) => {
  try {
    const chatsessions = await ChatSession.find({});
    res.send(chatsessions);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a Chat Session by ID
exports.getChatSessionById = async (req, res) => {
  try {
    const chatsession = await ChatSession.findById(req.params.id);
    if (!chatsession) {
      return res.status(404).send();
    }
    res.send(chatsession);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a chat session by ID
exports.updateChatSession = async (req, res) => {
  try {
    const chatsession = await ChatSession.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!chatsession) {
      return res.status(404).send();
    }
    res.send(chatsession);
  } catch (error) {
    res.status(400).send(error);
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
    res.status(500).send(error);
  }
};