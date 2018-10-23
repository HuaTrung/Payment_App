const User = require('../../../the_root/MongoModel/app/user');
const VerifyPhone = require('the_root/MongoModel/app/verifyPhone');
const config = require('the_root/config');
const passwordCrypt =  require('../utils/password.crypt');
const Nexmo = require('the_root/node_modules/nexmo');
const nexmo = new Nexmo({
  apiKey: config.nexmoKey,
  apiSecret: config.nexmoSecret
});

function checkPhoneExist(phone) {
  return User.findOne({phone}).exec();
}

function checkEmailExist(email) {
  return User.findOne({emal}).exec();
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

function verifyToken(data, request_id,callback){
  nexmo.verify.check({request_id, code: data.verifyCode}, (err, result) => {
    if(err) callback('SERVER_ERROR');
    else {
      console.log('Verify token data: ' + result);
      if(result && result.status == '0') { // check otp success
        let newUser = new User({
          name: data.name,
          phone: data.phone,
          countryCode:'VN',
          password: passwordCrypt.hashPassword(data.password),
          requestId: request_id,
          verified: true
        });
        // decrease per in verify later
        newUser
          .save()
          .then( doc => callback('REGISTER_SUCCESS',doc))
          .catch(err => callback('MONGO_DB_ERROR',err));
      } else callback('VERIFY_TOKEN_ERROR',{message: result.error_text, requestId: result.request_Id});
    }
  });
}

function sendToken(phone,countryCode,callback,verifyData) {
    nexmo.verify.request({number:phone, brand: 'Online payment',country:countryCode}, (err, result) => {
      if(err) callback('SERVER_ERROR');
      else { 
        if(result.status == '0') { // success        
          console.log('Start send token for number: ' + phone);
          if(verifyData) {
            verifyData.request_id = result.request_id;
            verifyData.expired = Date.now();
          } else {
            let newVerify = new Verify({ phone, request_id: result.request_id, expired: Date.now()}); 
            newVerify
              .save()
              .then( doc => callback('SEND_TOKEN_SUCCESS',doc))
              .catch(err => callback('MONGO_DB_ERROR',err));
          }
        } else  callback('SEND_TOKEN_ERROR', {message: result.error_text, requestId: result.request_id});         
      }
    });
}
 
function beforeSendToken(phone, callback) {
  User.findOne({ phone }).then( userData => { 
    // we will send token when phone number not existed in data or not be registered
    if(userData) callback('PHONE_REGISTERED'); 
    else {
      Verify.findOne({ phone }).then(verifyData => {
        if(verifyData) {
          if( Date.now() - verifyData.expired > 5000)  sendToken(phone,'VN', callback, verifyData);
          else callback('WAIT_TIME');
        } else sendToken(phone,'VN', callback, null); // not existed
      }).catch(err => callback('MONGO_DB_ERROR'));
    }
  }).catch(err => callback('MONGO_DB_ERROR'));
}

function registerUser(data,country,callback) {
  // get request id from verify database:
  VerifyPhone.findOne({ phone: data.phone }).then( verifyData => {
    if(verifyData) verifyToken(data,verifyData.request_id, callback); 
    else callback('PHONE_NUMBER_NOT_SEND');
  });  
}

module.exports = {
  checkPhoneExist,
  checkEmailExist,

  registerUser,
  beforeSendToken,
  verifyToken 
}