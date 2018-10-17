const User = require('../../../the_root/MongoModel/app/user');


function checkPhone(phone) {
  return User.findOne({phone}).exec();
}

function checkUsername(username) {
  return User.findOne({username}).exec();
}

module.exports = {
  checkUsername,
  checkPhone
}