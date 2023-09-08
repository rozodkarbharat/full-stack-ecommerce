const express = require("express");
const Authentication = require("../middleware/authenication");
const productModel = require("../model/product.model");
const NodeCache = require( "node-cache" );

const ProductRoute = express.Router();
const myCache = new NodeCache();

ProductRoute.post("/create",Authentication, async (req, res) => {
  try{
  var { name, price, category, description, image, original_price } = req.body;
  const data = new productModel({
    name,
    price,
    category,
    description,
    image,
    original_price,
  });
  await data.save();
  res.status(200).send({ message: "Product Created Succefully" });
}
catch(err){
  res.status(500).send({error:"Server error"})
}
});

ProductRoute.get("/all",async(req,res)=>{
  // let start=Date.now()
  // console.log(Date.now());
  try {
    let data = myCache.get( "products" );
    if ( data == undefined ){    
       data = await productModel.find();
       myCache.set("products", data);
      //  console.log(Date.now()-start,"cache miss");
  }
  // console.log(Date.now()-start,"after data");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
})

ProductRoute.post("/",async(req,res)=>{
  try {
    var body = {};
    var skip = 0;
    var { category, sort, page } = req.body;
    if (category) {
      body.category = category;
    }

    skip = (page - 1) * 6;
    var count = await productModel.find(body).count();
    let data = await productModel.find(body).skip(skip).limit(9);
    var totalPages = Math.ceil(count / 9);
    if (sort) {
      if (sort === "asc") {
        data = data.sort((a, b) => {
          return +a.price - +b.price;
        });
      } else {
        data = data.sort((a, b) => {
          return +b.price - +a.price;
        });
      }
    }
    res.status(200).json({ data, totalPages });
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
})

module.exports = ProductRoute;
