// backend/models/lecturer.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Giảng viên
const lecturerSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, trim: true },
  department: { type: String }, // Khoa
  // Các trường khác của giảng viên
}, {
  //Thông tin giảng viên
});

const lecturer = mongoose.model('lecturer', lecturerSchema);

module.exports = lecturer;