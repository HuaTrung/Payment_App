const crypto = require('crypto');

const User = require('../../../the_root/MongoModel/app/user');
const config = require('the_root/config');
const passwordCrypt =  require('../utils/password.crypt');
const Nexmo = require('the_root/node_modules/nexmo');
const nexmo = new Nexmo({
  apiKey: config.nexmoKey,
  apiSecret: config.nexmoSecret
});

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
  let text = 'Your sign in OP password is: ' + pass;
  nexmo.message.sendSms('Online Payment', user.phone,text, (err,response) => {
    if(err) console.log(err);
    else {
      User.password = passwordCrypt.hashPassword(pass);
      User.save().then(doc => callback('SEND_SUCCESS')).catch(err => console.log(err));
    }
  });
};

module.exports = {
  sendForgotPasswordbyPhone
}