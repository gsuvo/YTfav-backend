const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // campos para recuperación de contraseña
  resetToken: { type: String },
  resetTokenExpires: { type: Date }
});

module.exports = mongoose.model('User', userSchema);
