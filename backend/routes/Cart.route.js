const express = require("express");
const { decode } = require("jsonwebtoken"); 
const cartModel = require("../model/cart.model");
const productModel = require("../model/product.model");
var jwt = require("jsonwebtoken");
const Authentication = require("../middleware/authenication");

const cartRoute = express.Router();

cartRoute.post("/", Authentication, async (req, res) => {
  try {
    const {
      _id,
      name,
      price,
      category,
      description,
      image,
      original_price,
      username,
    } = req.body;

    const all_data = await cartModel.find({
      id: _id,
      username,
    });
    if (all_data.length > 0) {
      res.send({ message: "Product already exist in the cart" });
    } else {
      const data = new cartModel({
        id: _id,
        name,
        price,
        category,
        description,
        image,
        original_price,
        username,
        quantity: 1,
      });
      await data.save();
      res.status(200).send({ message: "Added to cart successfully" });
    }
  } catch (err) {
    res.status(500).send({ error: "Server Error" });
  }
});

cartRoute.get("/get", Authentication, async (req, res) => {
  try {
    const { username } = req.body;

    const data = await cartModel.find({
      username,
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("err");
    res.status(500).send({ error: "Server Error" });
  }
});

cartRoute.post("/cartcount", Authentication, async (req, res) => {
  let { _id, username, quantity } = req.body;

  try {
    if (req.body.quantity === 0) {
      const data = await cartModel.deleteOne({
        username,
        _id,
      });
      if (data.acknowledged) {
        var temp = await cartModel.find({ username });
        res.status(200).json(temp);
      } else {
        res.status(500).send({ error: "Server error" });
      }
    }
    if (req.body.quantity > 0) {
      const data = await cartModel.updateOne(
        {
          username,
          _id: req.body._id,
        },
        { quantity }
      );
      if (data.acknowledged) {
        var temp = await cartModel.find({ username });
        res.status(200).json(temp);
      } else {
        res.status(500).send({ error: "Server error" });
      }
    }
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = cartRoute;
