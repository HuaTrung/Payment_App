const registerService= require('../services/register.service');
const User = require('the_root/MongoModel/app/user');


function logInfo(info, data,res) {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  switch (info) {       
    case 'REGISTER_SUCCESS':
      api = { 
        status: 0,
        error: {},
        user:data
      };
      return res.status(400).json(api); 
  }
}

// =================================================================================
const verifyCodeController = (req,res) => { 
 
}
// =================================================================================
const confirmVerifyCodeController  = (req,res) => {
  // console.log(req.body);
  let { id } = req.body;
  User.findOne({_id:id}).then( user => {
    if(user) {
      console.log(user);
      registerService.verifyToken(req.body.code, user, (info,data) => logInfo(info,data,res));
    }else {
      logInfo('USER_NOTFOUND');
    }
  }).catch(err => logInfo('FIND_USER_ERROR',err));
}
// =================================================================================
const resendVerificationRequest = (req,res) => {
  let { id } = req.body;
  User.findOne({_id:id}).then( user => {
    if(user) {
      console.log(user);
      registerService.beforeSendNexmoToken(user, (info,data) => logInfo(info,data,res));
    }else {
      logInfo('USER_NOTFOUND');
    }
  }).catch(err => logInfo('FIND_USER_ERROR',err));
}
module.exports =  { 
  verifyCodeController,
  confirmVerifyCodeController,
  resendVerificationRequest
}