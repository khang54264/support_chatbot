// backend/models/notification.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Thông báo
const notificationSchema = new Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String},
    type: { type: String, required: true, trim: true }, // Loại thông báo
    image: { type: String }, // Link Hình ảnh
    timestamp: { type: Date, default: Date.now }, // Thời gian thông báo
    target: { type: String, required: true, trim: true }, // Đối tượng nhận thông báo
    lid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'lecturer', // Tham chiếu tới _id của lecturerSchema
          required: true
        }, //Id giảng viên là người gửi
});

const notification = mongoose.model('notification', notificationSchema);

module.exports = notification;