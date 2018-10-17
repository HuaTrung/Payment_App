const User = require('../../../the_root/MongoModel/app/user');
const Verify = require('../../../the_root/MongoModel/app/verify');
const config = require('the_root/config');
const authy = require('the_root/node_modules/authy')(config.apiProductKey);
const passwordCrypt =  require('../utils/password.crypt');
const Nexmo = require('the_root/node_modules/nexmo');
const nexmo = new Nexmo({
  apiKey: config.nexmoKey,
  apiSecret: config.nexmoSecret
});

function checkPhoneExist(phone) {
  return User.findOne({phone}).exec();
}

function checkUsernameExist(username) {
  return User.findOne({username}).exec();
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
      console.log(result);
      if(result && result.status == '0') { // check otp success
        let newUser = new User({
          name: data.name,
          username: data.username,
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
      } else callback('NEXMO_SERVER_ERROR',{message: result.error_text, requestId: result.request_Id});
    }
  });
}

function sendToken(phone,countryCode,callback,verifyData) {
    nexmo.verify.request({number:phone, brand: 'Online payment',country:countryCode}, (err, result) => {
      if(err) callback('SERVER_ERROR');
      else { 
        if(result.status == '0') { // success        
          console.log('start send token for number: ' + phone);
          if(verifyData) {
            verifyData.request_id = result.request_id;
            verifyData.expired = Date.now();
          } else {
            let newVerify = new Verify({
              phone,
              request_id: result.request_id,
              per: 2,
              expired: Date.now()
            }) 
            newVerify
              .save()
              .then( doc => callback('SEND_TOKEN_SUCCESS',doc))
              .catch(err => callback('MONGO_DB_ERROR',err));
          }
        } else  callback('NEXMO_STATUS_ERROR', {message: result.error_text, requestId: result.request_id});         
      }
    });
}
 
function beforeSendNexmoToken(phone, callback) {
 
  Verify.findOne({ phone }).then( verifyData => { 
    if(verifyData) { // already existed
      if(verifyData.per > 0){
        if( Date.now() - verifyData.expired > 1000)  sendToken(phone,'VN', callback, verifyData);
        else callback('WAIT_TIME');
      } else callback('PHONE_SEND_OVER');
    } else sendToken(phone,'VN', callback, null); // not existed
  });
}

function registerUser(data,country,callback) {
  let newVerify = new Verify({
    phone: 'dfdfdf',
    request_id: 'dfdfd',
    per: 2,
    expired: Date.now()
  }); 
  newVerify
    .save()
    .then( doc => callback('SEND_TOKEN_SUCCESS',doc))
    .catch(err => callback('MONGO_DB_ERROR',err));

  // get request id from verify database:
  Verify.findOne({ phone: data.phone }).then( verifyData => {
    if(verifyData) verifyToken(data,verifyData.request_id, callback); 
    else callback('PHONE_NUMBER_NOT_SEND');
  });
}

module.exports = {
  checkPhoneExist,
  checkUsernameExist,
  registerUser,
  beforeSendNexmoToken
}