// backend/models/faq.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Bộ câu hỏi câu trả lời
const faqSchema = new Schema({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true },
  // Các trường khác của bộ câu hỏi câu trả lời
}, {
  //Thông tin bộ câu hỏi câu trả lời
});

const faq = mongoose.model('faq', faqSchema);

module.exports = faq;