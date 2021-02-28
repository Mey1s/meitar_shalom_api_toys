const express = require('express');
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { validUser, UserModel, validLogin, GenerateToken } = require('../models/userModel');
const router = express.Router();

router.post("/", async(req,res)=>{
    let validBody = validUser(req.body);
    if(validBody.error){
        return res.status(400).json(validBody.error.details);
    }
    try{
        let user = new UserModel(req.body);
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.status(201).json(_.pick(user,["_id","name","email","date_created","role"]));
    }
    catch (err) {
        res.status(400).json(err);
      }
})

router.post("/login", async(req,res)=>{
    let validBody = validLogin(req.body);
    if(validBody.error){
        return res.status(400).json(validBody.error.details);
    }
    try{
        let user = await UserModel.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({message: "You must register first"});
        }
        let validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(400).json({message: "Email or password incorrect"});
        }
        let token = GenerateToken(user._id);
        res.json({token: token});
    }
    catch (err) {
        res.status(400).json(err);
      }
})

module.exports = router;