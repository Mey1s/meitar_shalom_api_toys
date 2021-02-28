const express = require("express");
const {ToyModel,validToy} = require("../models/toyModel");
const { authToken } = require('../middlewares/auth');
const router = express.Router();

router.get("/", async(req,res)=>{
    let s = req.query.s;
    let page = req.query.page;
    let perPage = 10;
    try{
        let regSearch = new RegExp(s, "i");
        let data = await ToyModel.find({$or:[{name:regSearch},{info:regSearch}]}).sort({date_created:1}).limit(perPage).skip(perPage*page);
        res.json(data);
    }
    catch (err) {
        res.status(400).json(err);
      }
})

router.get("/cat/:catname", async(req,res)=>{
    let catName = req.params.catname;
    let page = req.query.page;
    let perPage = 10;
    try{
        let regCat = new RegExp(catName, "i");
        let data = await ToyModel.find({category:regCat}).sort({date_created:1}).limit(perPage).skip(perPage*page);
        res.json(data);
    }
    catch (err) {
        res.status(400).json(err);
      }
})

router.get("/prices", async(req,res)=>{
    let page = req.query.page;
    let perPage = 10;
    let min = Number(req.query.min) ? Number(req.query.min) : 0;
    let max = Number(req.query.max) ? Number(req.query.max) : 9999999;
    try{
        let data = await ToyModel.find({price: {$gt:min, $lt:max}}).sort({date_created:1}).limit(perPage).skip(perPage*page);
        res.json(data);
    }
    catch (err) {
        res.status(400).json(err);
      }
})

router.post("/",authToken, async(req,res)=>{
    let validBody = validToy(req.body);
    if(validBody.error){
        return res.status(400).json(validBody.error.details);
    }
    try{
        let data = new ToyModel(req.body);
        data.user_id = req.userData._id;
        await data.save();
        res.status(201).json(data);
    }
    catch (err) {
        res.status(400).json(err);
      }
})

router.put("/:editId",authToken, async(req,res)=>{
    let editId = req.params.editId;
    let validBody = validToy(req.body);
    if(validBody.error){
        return res.status(400).json(validBody.error.details);
    }
    try{
        let upData = await ToyModel.updateOne({_id:editId, user_id:req.userData._id}, req.body);
        res.status(201).json(upData);
    }
    catch (err) {
        res.status(400).json(err);
      }
})

router.delete("/:delId",authToken, async(req,res)=>{
    let delId = req.params.delId;
    try{
        let delData = await ToyModel.deleteOne({_id:delId, user_id:req.userData._id});
        res.json(delData);
    }
    catch (err) {
        res.status(400).json(err);
      }
})

module.exports = router;