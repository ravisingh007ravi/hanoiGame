const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  steps: { type: Number, required: true },
  duration: { type: Number, required: true },
});

module.exports = mongoose.model('Game', gameSchema);
