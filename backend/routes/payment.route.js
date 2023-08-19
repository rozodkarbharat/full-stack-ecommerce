const express = require("express");
require("dotenv").config()
const productModel = require("../model/product.model");
const stripe = require('stripe')(process.env.STRIPE_CODE)
const paymentRoute = express.Router();


paymentRoute.post('/create-checkout-session', async (req, res) => {
  
  const session = await stripe.checkout.sessions.create({
    line_items: [
        {
            price_data: {
              currency: 'inr',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
    ],
    mode: 'payment',
    success_url: `${process.env. YOUR_DOMAIN}/checkout-success`,
    cancel_url: `${process.env.YOUR_DOMAIN}/checkout-cancel`,
  });

  res.send({url: session.url});
});


module.exports = paymentRoute;
