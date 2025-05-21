// backend/models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Người dùng
const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, trim: true },
  role: { type: String, trim: true, default: "user" }, // Quyền hạn
  fullname: { type: String, trim: true },
  dateofbirth: { type: Date },
  gender: { type: String},
  phone: { type: String, trim: true },
  image: { type: String, trim: true },
});

const user = mongoose.model('user', userSchema);

module.exports = user;