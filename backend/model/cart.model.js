const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  id: String,
  name: String,
  price: String,
  category: String,
  description: String,
  image: String,
  original_price: String,
  username: String,
  quantity: Number,
});

const cartModel = mongoose.model("cart", cartSchema);
module.exports = cartModel;
