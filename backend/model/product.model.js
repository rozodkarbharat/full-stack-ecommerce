const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
name:String,
price:Number,
category:String,
description:String,
image:String,
original_price:Number
});



const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
