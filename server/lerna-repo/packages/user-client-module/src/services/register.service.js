const User = require('../../../the_root/MongoModel/app/user');
const config = require('the_root/config');
const authy = require('the_root/node_modules/authy')(config.apiProductKey);

const Nexmo = require('the_root/node_modules/nexmo');
const nexmo = new Nexmo({
  apiKey: config.nexmoKey,
  apiSecret: config.nexmoSecret
});

function checkUserNameExist(username) {
  return User.findOne({username}).exec();
}

function checkEmailExist(email) {
  return User.findOne({email}).exec();
}

function cancelVerificationRequest(data, callback){
  nexmo.verify.control({request_id:data.requestId, cmd: 'cancel'}, function(err, result) {
    if(err) { 
      callback('CANCEL_VERIFICATION',err);
    }
    else {      
      console.log(result);
      if(result.status == '0') {
//        data.request_Id = null;
      } else {
        callback('CANCEL_ERROR',{requestId: result.request_Id});
      }
    }
  });
}

function verifyToken(otp, user,callback){

  nexmo.verify.check({request_id: user.requestId, code: otp}, (err, result) => {
    if(err) {
      callback('SERVER_ERROR');
    } else {
      console.log(result);
      if(result && result.status == '0') {
        user.verified = true;
        user
          .save()
          .then( doc => callback('REGISTER_SUCCESS',doc))
          .catch(err => callback('MONGO_DB_ERROR',err));
      } else {
        callback('NEXMO_SERVER_ERROR',{message: result.error_text, requestId: result.request_Id});
      }
    }
  });
}

function sendToken(data,callback) {
  console.log('resend');
  nexmo.verify.request({number:data.phone, brand: 'Online payment',country:data.countryCode}, (err, result) => {
    if(err) {
      callback('SERVER_ERROR');
    } else { 
      if(result.status == '0') { // success
        data.requestId = result.request_id;
        if(data.verified) data.verified = false;
        data
          .save()
          .then( user => callback('MONGO_DATA_ID',user.id))
          .catch(err => callback('MONGO_DB_ERROR',err));
      } else 
        callback('NEXMO_STATUS_ERROR', {message: result.error_text, requestId: result.request_id});         
    }
  });
}
 
async function beforeSendNexmoToken(data, callback) {
  if(!data.requestId) {
    sendToken(data,callback);
  } else {  // send again
    await cancelVerificationRequest(data.requestId,callback);
    data.requestId = null;
    sendToken(data,callback);
  }
}

function registerUser(data,country,callback) {

  let newUser = new User({
    email: data.email,
    username: data.username,
    phone: data.phone,
    countryCode:country,
    password: data.password
  });
  newUser
    .save()
    .then( user => beforeSendNexmoToken(user,callback))
    .catch(err => callback('MONGO_DB_ERROR',err));

}

module.exports = {
  checkUserNameExist,
  checkEmailExist,
  registerUser,
  verifyToken,
  beforeSendNexmoToken
}