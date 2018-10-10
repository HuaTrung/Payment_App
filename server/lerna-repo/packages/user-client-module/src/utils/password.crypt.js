const bcrypt = require('the_root/node_modules/bcryptjs');

const hashPassword = (pass) =>  bcrypt.hashSync(pass, 10);

const comparePassowrd = (pass,hash) => bcrypt.compareSync(pass,hash);

module.exports = {
  hashPassword,
  comparePassowrd
}