const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken")
const {config} = require("../config/secretData");

let userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    date_created:{
        type:Date, default:Date.now()
    },
    role:{
        type:String,default:"regular"
      }
})

exports.UserModel = mongoose.model("users", userSchema);

exports.GenerateToken = (_id)=>{
    let token = jwt.sign({_id}, config.jwtSecret, {expiresIn:"60mins"});
    return token;
}

exports.validUser = (_body)=>{
    let joiSchema = Joi.object({
        name:Joi.string().min(2).max(100).required(),
        email:Joi.string().min(2).max(100).email().required(),
        password:Joi.string().min(2).max(100).required()
      })
      return joiSchema.validate(_body);
}

exports.validLogin =(_body)=>{
    let joiSchema = Joi.object({
        email:Joi.string().min(2).max(100).email().required(),
        password:Joi.string().min(2).max(100).required()
      })
      return joiSchema.validate(_body);
}