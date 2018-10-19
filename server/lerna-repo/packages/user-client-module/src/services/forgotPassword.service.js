const crypto = require('crypto');

const User = require('../../../the_root/MongoModel/app/user');
const config = require('the_root/config');
const passwordCrypt =  require('../utils/password.crypt');
const Nexmo = require('the_root/node_modules/nexmo');
const nexmo = new Nexmo({
  apiKey: config.nexmoKey,
  apiSecret: config.nexmoSecret
},{debug:true});

function safeRandomBytes(length) {
  while(true) {
    try {
      return crypto.randomBytes(length);
    } 
    catch(e){
      continue;
    }
  }
}

const sendForgotPasswordbyPhone = (user,callback) => {
  let pass = Math.random().toString(36).slice(-8);
  let text = 'Reset your OP password: ' +pass;
  nexmo.message.sendSms('Online Payment', '84'+user.phone,text, (err,response) => {
    if(err) console.log(err);
    else {
      console.log(response);
      if(response.messages[0].status == 0) {
        user.password = passwordCrypt.hashPassword(pass);
        user.save().then(doc => callback('SEND_SUCCESS')).catch(err => console.log(err));
      }
    }
  });
};

module.exports = {
  sendForgotPasswordbyPhone
}