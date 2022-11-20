const express = require("express");
const { decode } = require("jsonwebtoken");
const cartModel = require("../model/cart.model");
const productModel = require("../model/product.model");
var jwt = require("jsonwebtoken");

const cartRoute = express.Router();

cartRoute.post("/",async(req,res)=>{
try {
    
    const  { _id,name, price,category, description, image, original_price}=req.body
  jwt.verify(req.body.token, "secret",async function (err, decoded) {
    if (err) {
      res.send({ message: "Server Error" });
    }
   const all_data = await cartModel.find({
     id: req.body._id,
     username: decoded.username,
   });
   if(all_data.length>0){
    res.send({ message: "Product already exist in the cart" });
   }
   else{
        const data = new cartModel({
          id: _id,
          name,
          price,
          category,
          description,
          image,
          original_price,
          username: decoded.username,
          quantity:1
        });
        await data.save();
        res.send({ message: "Added to cart successfully" });
   }
   

  });

} catch (err) {
  res.send({ message: "Server Error" });
}
    
})

cartRoute.post("/get", async (req, res) => {
  try {
    jwt.verify(req.body.token, "secret", async function (err, decoded) {

      if (err) {
        res.send({ message: "Server Error" });
      }
      const data = await cartModel.find({
        username: decoded.username
      });
      res.json(data);
    });
  } catch (err) {
    console.log("err")
    res.send({ message: "Server Error" });
  }
});

cartRoute.post("/cartcount",(req,res)=>{
 let {_id,id, name,price,category,description,image,original_price,username,quantity}=req.body

  if(req.body.quantity===0){
    jwt.verify(req.body.token, "secret", async function (err, decoded) {
      if (err) {
        res.send({ message: "Server Error" });
      }
      const data = await cartModel.deleteOne({
        username: decoded.username,_id
      });
     if (data.acknowledged) {
       var temp = await cartModel.find({ username: decoded.username });
       res.json(temp);
     } else {
       res.send({ error: "Server error" });
     }
    });
  }
  if(req.body.quantity>0){
     jwt.verify(req.body.token, "secret", async function (err, decoded) {
       if (err) {
         res.send({ message: "Server Error" });
       }
       const data = await cartModel.updateOne(
         {
           username: decoded.username,
           _id: req.body._id,
         },
         { quantity }
       );
       if(data.acknowledged){
          var temp = await cartModel.find({ username: decoded.username});
          res.json(temp)
       }
       else{
        res.send({error:"Server error"})
       }
     });
  }
})


module.exports=cartRoute