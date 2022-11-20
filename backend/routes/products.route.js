const express = require("express");
const productModel = require("../model/product.model");

const ProductRoute = express.Router();

ProductRoute.post("/create", async (req, res) => {
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

  console.log(data);
  res.send({ message: "Product Created Succefully" });
});

ProductRoute.get("/all",async(req,res)=>{
const data = await productModel.find()
res.json(data)
})

ProductRoute.post("/",async(req,res)=>{
  var body={}
  var skip=0
  var limit=6
var {category,sort,page}=req.body
if (category) {
  body.category = category;
}

skip=(page-1)*6
var count = await productModel.find(body).count()
let data= await productModel.find(body).skip(skip).limit(9)
var totalPages=Math.ceil(count/9)
if(sort){
  if(sort==="asc"){
    data=data.sort((a,b)=>{
    return  +a.price - +b.price
    })
  }
  else{
data = data.sort((a, b) => {
 return +b.price - +a.price;
});
  }
}
res.json({data,totalPages})

})

module.exports = ProductRoute;
