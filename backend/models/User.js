const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['senior', 'volunteer', 'admin'],
    default: 'senior',
  },
  age: {
    type: Number,
    required: [true, 'Please add age'],
    min: 18,
  },
  phone: {
    type: String,
    required: [true, 'Please add phone number'],
    match: [/^\d{10}$/, 'Please add a valid 10-digit phone number'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
