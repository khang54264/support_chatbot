// backend/models/faq.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Bộ câu hỏi câu trả lời
const faqSchema = new Schema({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true },
  dateupdate: { type: Date, default: Date.now },
});

const faq = mongoose.model('faq', faqSchema);

module.exports = faq;