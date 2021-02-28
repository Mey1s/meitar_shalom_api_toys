const jwt = require("jsonwebtoken");
const {config} = require("../config/secretData");

exports.authToken = (req,res,next) => {
  let token = req.header("auth-token");
  if(!token){
    return res.status(400).json({msg:"You must enter a token"});
  }
  try{
    let decodeToken = jwt.verify(token,config.jwtSecret);
    req.userData = decodeToken;
    next();
  }
  catch (err) {
    console.log(err);
    res.status(400).json({msg:"Token expired/invalid"});
  }
}