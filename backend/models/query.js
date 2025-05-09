
// backend/models/query.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Câu hỏi chuyển tới giảng viên
const querySchema = new Schema({
    question: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    response: { type: String, required: true, trim: true },
    u_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user', // Tham chiếu tới _id của UserSchema
          required: true
        },
    l_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'lecturer', // Tham chiếu tới _id của lecturerSchema
          required: true
        },
  // Các trường khác của câu hỏi
}, {
  //Thông tin câu hỏi
});

const query = mongoose.model('query', querySchema);

module.exports = query;