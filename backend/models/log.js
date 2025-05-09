// backend/models/log.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
  input: { type: String, required: true, trim: true },
  response: { type: String, required: true },
  handle: { type: String, trim: true }, // Đánh dấu Bot trả lời hoặc giảng viên trả lời
  u_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Tham chiếu tới _id của UserSchema
        required: true
      },
}, {
  //Thông tin khác của log
});

const log = mongoose.model('log', logSchema);

module.exports = log;