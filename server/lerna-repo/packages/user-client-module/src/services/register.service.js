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

// function sendToken(user,callback) {
//   authy.request_sms(user.request_id,true, (err,response) => {
//     console.log(response); 
//     // send token success
//     // store id and in async storage at app
//   //  if(response.success) {
//      // callback('DATA_ID',user.id);
//     //} else {
//     //  callback('ERROR_SEND_TOKEN');
//     //}
//   })
// }

// const verifyAuthyToken = (otp, user,res) => {
//   authy.verify(user.request_id, otp, function(err,response) {
//     console.log(response);
//     if(response.success == 'true') {
//       user.verified = true;
//       user.save().then( doc => {
//         // register success
//         // auto login 
//         // create jwt and store at async storage
//         res.status(200).json(doc);
//       });
//     }
//   });
// }

// function createNewUser(response,newUser,callback) {
//   if (response.user) {
//     newUser.request_id = response.user.id;
//     newUser.save().then( doc => sendToken(doc,callback));
//   }
// };
  
// function sendAuthyToken(newUser,callback){
//   if (!newUser.request_id) { // Register this user if it's a new user
//     console.log('authy register_user: ', newUser);
//     authy.register_user(
//       newUser.email, 
//       newUser.phone,
//       newUser.countryCode, (err,response) => createNewUser(response, newUser,callback))
//     }
//   else  // Otherwise send token to a known user
//     sendToken(newUser.request_id,callback);
// }

function sendNexmoToken(number, callback) {
  nexmo.verify.request({number, brand: 'Online payment'}, (err, result) => {
    if(err) {
      callback('SERVER_ERROR');
    } else {
      console.log(result);
      let newUser = new User({
        email: data.email,
        username: data.username,
        phone: data.phone,
        countryCode:'+84',
        password: data.password,
        request_id: result.request_id
      });
      newUser
        .save()
        .then( user => {
          if(result.status == '0') 
            callback('DATA_ID',user.id);
          callback('STATUS_ERROR', {message: result.error_text, requestId: requestId});
        });
    }
});
}

const registerUser = (phone,callback) => {

  sendNexmoToken(phone,callback);

  // let newUser = new User({
  //   email: data.email,
  //   username: data.username,
  //   phone: data.phone,
  //   countryCode:'+84',
  //   password: data.password
  // });

  // newUser
  //   .save()
  //   .then( doc => sendAuthyToken(doc,callback));

  // newUser
  //   .save()
  //   .then( doc => sendAuthyToken(doc,callback));
}

module.exports = {
  checkUserNameExist,
  checkEmailExist,
  registerUser,
  verifyAuthyToken
}