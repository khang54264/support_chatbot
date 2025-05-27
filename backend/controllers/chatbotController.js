const Chatbot = require('../models/chatbot');

// Create a new chatbot
exports.createChatbot = async (req, res) => {
  try {
    const chatbot = new Chatbot(req.body);
    await chatbot.save();
    res.status(201).send({ chatbot });
  } catch (error) {
    res.status(400).send(error);
  }
};