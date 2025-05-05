// backend/models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, trim: true },
  // Các trường khác của người dùng
}, {
  timestamps: true, // Tự động tạo createdAt và updatedAt
});

const User = mongoose.model('User', userSchema);

module.exports = User;