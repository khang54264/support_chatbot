const ChatMessage = require('../models/chatmessage');

// Send/Create a new chatmessage
exports.createChatMessage = async (req, res) => {
  try {
    const chatmessage = new ChatMessage(req.body);
    await chatmessage.save();
    res.status(201).send(chatmessage);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all messages
exports.getAllChatMessages = async (req, res) => {
  try {
    const chatmessages = await ChatMessage.find({});
    res.send(chatmessages);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a chatmessage by ID
exports.getChatMessageById = async (req, res) => {
  try {
    const chatmessage = await ChatMessage.findById(req.params.id);
    if (!chatmessage) {
      return res.status(404).send();
    }
    res.send(chatmessage);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a chatmessage by ID
exports.updateChatMessage = async (req, res) => {
  try {
    const chatmessage = await ChatMessage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!chatmessage) {
      return res.status(404).send();
    }
    res.send(chatmessage);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a chatmessage by ID
exports.deleteChatMessage = async (req, res) => {
  try {
    const chatmessage = await ChatMessage.findByIdAndDelete(req.params.id);
    if (!chatmessage) {
      return res.status(404).send();
    }
    res.send({ message: 'Chat Message deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
};