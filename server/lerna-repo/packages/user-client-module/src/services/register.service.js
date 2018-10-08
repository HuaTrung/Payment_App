const User = require('../../../the_root/MongoModel/app/user');
const config = require('the_root/config');
const authy = require('the_root/node_modules/authy')(config.apiProductKey);

function checkUserNameExist(username) {
  return User.findOne({username}).exec();
}

function checkEmailExist(email) {
  return User.findOne({email}).exec();
}

function sendToken(user,res) {
  authy.request_sms(user.authyId,true, (err,response) => {
    console.log(response); 
    return response.success ? res.status(400).json(user) : res.status(400).json(null);
  })
}

const verifyAuthyToken = (otp, user,res) => {
  authy.verify(user.authyId, otp, function(err,response) {
    console.log(response);
    if(response.success == 'true') {
      user.verified = true;
      user.save().then( doc => {
        res.json(doc);
      });
    }
  });
}

function createNewUser(response,newUser,res) {
  if (response.user) {
    newUser.authyId = response.user.id;
    newUser.save().then( doc => sendToken(doc,res));
  }
};
  
function sendAuthyToken(newUser,res){
  if (!newUser.authyId) { // Register this user if it's a new user
    console.log('authy register_user: ', newUser);
    authy.register_user(
      newUser.email, 
      newUser.phone,
      newUser.countryCode, (err,response) => createNewUser(response, newUser,res))
    }
  else  // Otherwise send token to a known user
    sendToken(newUser.authyId,res);
}

const registerUser = (data,res) => {

  let newUser = new User({
    email: data.email,
    username: data.username,
    phone: data.phone,
    countryCode:'+84',
    password: data.password
  });

  newUser
    .save()
    .then( doc => sendAuthyToken(doc,res));
}

module.exports = {
  checkUserNameExist,
  checkEmailExist,
  registerUser,
  verifyAuthyToken
}