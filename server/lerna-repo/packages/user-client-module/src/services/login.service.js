const User = require('../../../the_root/MongoModel/app/user');


function checkPhone(phone) {
  return User.findOne({phone}).exec();
}

function checkEmail(email) {
  return User.findOne({email}).exec();
}

async function checkEmailPhone(emailPhone,callback) {
await  checkPhone(emailPhone).then(u1 => {
    console.log(u1);
    if(u1) return u1;
    return checkEmail(emailPhone).then ( u2 => {
      if(u2) return u2;
      return null;
    });
  }).catch( err => callback('SERVER_DIE',err));
}

module.exports = {
  checkEmailPhone,
  checkEmail,
  checkPhone
}