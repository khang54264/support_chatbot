
// backend/models/chatsession.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Cuộc trò chuyện
const chatSessionSchema = new Schema({
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    timestamp: { type: Date, default: Date.now }, // Thời gian bắt đầu cuộc trò chuyện
    uid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user', // Tham chiếu tới _id của userSchema
          required: true
        },
    lid: [{ // Change l_id to an array
          type: mongoose.Schema.Types.ObjectId,
          ref: 'lecturer', // Tham chiếu tới _id của lecturerSchema
        }],
});

const chatSession = mongoose.model('chatSession', chatSessionSchema);

module.exports = chatSession;