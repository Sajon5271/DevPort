// const { model } = require('mongoose');
const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String },
  profileId: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userInfoSchema);

module.exports = User;
