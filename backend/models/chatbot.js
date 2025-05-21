// backend/models/chatbot.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Người dùng
const chatbotSchema = new Schema({
  name: { type: String, required: true, trim: true },
  image: { type: String, required: true },
});

const chatbot = mongoose.model('chatbot', chatbotSchema);

module.exports = chatbot;