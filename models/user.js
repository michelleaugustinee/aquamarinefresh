const { text } = require("body-parser");
const mongoose = require("mongoose");

// Mendeklarasikan variable dari userSchema yang akan dimasukkan ke database
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema, "account");
