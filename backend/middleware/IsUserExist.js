const userModel = require("../model/user.model")


const IsUserExist=async(req,res,next)=>{
    const username = req.body.username;
    const logindata = await userModel.findOne({ username });

    if (logindata) {
      res.send("user already exists");
    } 
    else {
      next();
    }
}
module.exports=IsUserExist