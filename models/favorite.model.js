const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  thumbnail: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
