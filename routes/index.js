const express = require("express");

const router = express.Router();

router.get("/", (req,res) => {
  res.json({message:"Toys API - created by Meitar Shalom. To see the documentation go to /documentation.html"});
})

module.exports = router;