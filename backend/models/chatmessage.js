// filepath: d:\DATN\supportchatbot\backend\models\chatmessage.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
    chatsid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chatSession', // Tham chiếu tới _id của chatSessionSchema
        required: true
    },
    sender_type: { type: String, required: true, trim: true }, // Người gửi là user hay lecturer hay chatbot
    senderid: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'sender_type', // Tham chiếu tới _id của userSchema hoặc lecturerSchema
        required: true
    },
    content: { type: String, required: true, trim: true }, // Nội dung tin nhắn
    timestamp: { type: Date, default: Date.now }, // Thời gian gửi tin nhắn
    status: { type: String, required: true, trim: true }, // Trạng thái tin nhắn (đã gửi, đã nhận, đã đọc)
});

const chatMessage = mongoose.model('chatMessage', chatMessageSchema);

module.exports = chatMessage;