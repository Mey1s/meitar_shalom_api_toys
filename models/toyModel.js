const mongoose = require("mongoose");
const Joi = require("joi");

let toySchema = new mongoose.Schema({
    name:String,
    info:String,
    category:String,
    img_url:String,
    price:Number,
    date_created:{
        type:Date, default:Date.now()
    },
    user_id:String
});

exports.ToyModel = mongoose.model("toys", toySchema);

exports.validToy = (_body)=>{
    let joiSchema = Joi.object({
        name:Joi.string().min(2).max(100).required(),
        info:Joi.string().min(2).max(300).required(),
        category:Joi.string().min(2).max(100).required(),
        img_url:Joi.string().min(2).max(300).required(),
        price:Joi.number().min(0).max(99999999).required()
    })
    return joiSchema.validate(_body);
}