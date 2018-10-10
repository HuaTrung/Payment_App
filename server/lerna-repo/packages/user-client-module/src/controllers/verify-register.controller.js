const registerService= require('../services/register.service');
const User = require('the_root/MongoModel/app/user');



// =================================================================================
const verifyCodeController = (req,res) => { 
 
}
// =================================================================================
const confirmVerifyCodeController  = (req,res) => {
  console.log(req.body);
  let { id } = req.body;
  User.findOne({_id:id}).then( user => {
    if(user) {
      console.log(user);
      registerService.verifyAuthyToken(req.body.code, user,res);
      
    }
  });
}
// =================================================================================
module.exports =  { 
  verifyCodeController,
  confirmVerifyCodeController
}