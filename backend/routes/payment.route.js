const express = require("express");
require("dotenv").config();
const productModel = require("../model/product.model");
const stripe = require("stripe")(process.env.STRIPE_CODE);
const paymentRoute = express.Router();

paymentRoute.post("/create-checkout-session", async (req, res) => {
  let data = req.body.data;
  let line_items = data.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.YOUR_DOMAIN}/checkout-success`,
    cancel_url: `${process.env.YOUR_DOMAIN}/checkout-cancel`,
  });
    console.log(session)
  res.send({ url: session.url });
});

module.exports = paymentRoute;
