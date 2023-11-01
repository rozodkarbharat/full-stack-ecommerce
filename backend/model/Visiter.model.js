const mongoose = require("mongoose");

const visiterSchema = mongoose.Schema({
  username: String,
  IP:String,
  DateTime:String
});

const visiterModel = mongoose.model("user", visiterSchema);

module.exports = visiterModel;