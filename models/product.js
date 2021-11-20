const mongoose = require("mongoose"); // Memanggil Module Mongoose //

// Mendeklarasikan variable dari productSchema yang akan dimasukkan ke database //
const productSchema = mongoose.Schema({
  imagePath: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema, "productlist");
