const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request',
    required: true,
  },
  message: {
    type: String,
    required: [true, 'Please add feedback message'],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, 'Please add rating'],
    min: 1,
    max: 5,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Feedback', feedbackSchema);
