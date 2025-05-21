// backend/models/lecturer.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Giảng viên
const lecturerSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, trim: true },
  fullname: { type: String, trim: true },
  gender: { type: String }, // Giới tính
  phone: { type: String, trim: true },
  department: { type: String }, // Khoa
  image: {type: String, trim: true }, // Hình ảnh
});

const lecturer = mongoose.model('lecturer', lecturerSchema);

module.exports = lecturer;