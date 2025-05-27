// filepath: d:\DATN\supportchatbot\backend\models\chatsession.js
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
    messages: [{ // Array of messages
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chatMessage', // Tham chiếu tới _id của chatMessageSchema
    }],
});

// Middleware to delete associated chat messages before deleting a chat session
chatSessionSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        // Delete all chat messages associated with the chat session
        await ChatMessage.deleteMany({ chatsid: this._id });
        console.log(`Deleted chat messages for chat session ${this._id}`);
        next();
    } catch (error) {
        console.error(`Error deleting chat messages for chat session ${this._id}:`, error);
        next(error);
    }
});

const chatSession = mongoose.model('chatSession', chatSessionSchema);

module.exports = chatSession;