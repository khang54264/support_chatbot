// backend/models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Người dùng
const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, trim: true },
  // Các trường khác của người dùng
}, {
  //Thông tin sinh viên
});

const user = mongoose.model('user', userSchema);

module.exports = user;