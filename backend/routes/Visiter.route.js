const visiterModel = require("../models/visiter")
const express = require("express");


const visiterRouter = express.Router();


visiterRouter.post('/', async function(req, res){
    try{
        const {username,IP}=req.body;
        let DateTime=new Date();
        const data = new visiterModel({ username, IP,DateTime });
        await data.save();
        res.send("visiter saved successfully")
    }
    catch(err){
        res.send(err.message)
    }
})

module.exports = visiterRouter;