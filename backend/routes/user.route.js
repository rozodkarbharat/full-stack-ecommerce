const express=require("express")
const bcrypt=require("bcrypt")
const userModel = require("../model/user.model");
const IsUserExist = require("../middleware/IsUserExist");
var jwt = require("jsonwebtoken");

const userRouter=express.Router()

userRouter.post("/signup", IsUserExist, (req, res) => {
  const { username, password, name } = req.body;
try {
  bcrypt.hash(password, 3, async function (err, hash) {
    if (err) {
      res.send("Please try again later");
    }
    const data = new userModel({ username, password: hash, name });
    await data.save();
    res.status(200).send("User Registered Successsfully");
  });
} catch (err) {
  res.send({message:"Something went wrong",err})
}
});

userRouter.post("/login", async (req, res) => {
    try{

   
  var { username, password } = req.body;
  const Data = await userModel.findOne({ username });

  bcrypt.compare(password, Data.password, function (err, result) {
    if (result) {
      var token = jwt.sign({ username }, "secret");
      res.send({ message: "login successful", token,name:Data.name,username});
    } else {
      res.send("Invalid credentials");
    }
  });
   }
   catch(err){
    res.send("server Error")
   }
});


module.exports=userRouter