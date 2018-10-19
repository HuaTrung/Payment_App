const User = require('../../../the_root/MongoModel/app/user');
const forgotPassService = require('../services/forgotPassword.service');
const errorsName = require('../validations/errors-name');
const api = {
  success: 1,
  errors: {}
}

function callBack(info, data,res) {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  switch (info) {
    case 'SEND_SUCCESS':
    {
      api.success = 1;
      return res.status(200).json(api);    
    }
  }
}

const sendForgotPasswordByEmail = (user,res) => {
  if(user.verified) {
    // start send by email:
  } else {

  }
}

const sendForgotPasswordByPhone = (user,res) => {
  if(user) {
    if(user.verified) {
      // start send by phone:
      forgotPassService.sendForgotPasswordbyPhone(user,(info,data) => callBack(info,data,res));
    } else {
     // api.errors.toast = '' 
    }
  } else {
    api.success = 1;
    api.errors.emailOrPhone = errorsName.EMAIL_PHONE_NOT_EXIST;
  }
}

module.exports = (req,res) => {
  let { type, emailOrPhone } = req.body;
  // check the account verify Email or not:
  if(body == 'email') User.findOne({email: emailOrPhone}).then(user => sendForgotPasswordByEmail(user,res));
  else User.findOne({phone: emailOrPhone}).then(user => sendForgotPassword(user,res));
}