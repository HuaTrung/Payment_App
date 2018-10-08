const registerValidate = require('../validations/register.validation');
const registerService = require('../services/register.service');

const User = require('../../../the_root/MongoModel/app/user');
const errorNames = require('../validations/errors-name');

const config = require('the_root/config');

/**
 * @description: register client user by:
 * 1: Check information client send is correctly or not (logic)
 *      + If error -> response errors to client user
 *      + If not -> continue   
 * 2. Check user name / email is used or not by access database
 *      + If error -> response errors to client user
 *      + If not -> continue   
 * 3. Check verify code by using authy
 *      + 1 phone number can send 2 verify code / day
 * 4. Register successfully
 */
module.exports =  (req,res) => {
	// get all errors when user submit regiser:
	// console.log(req.body);
	let { errors, isValid } = registerValidate(req.body);
	// can continue to b2?
	if(!isValid) return res.status(400).json(errors);

	let { username, email } = req.body;
  //	console.log(req.body);
	// Check user name / email is used or not by access database
  registerService.checkEmailExist(email).then( u1 => {
    return registerService.checkUserNameExist(username).then( u2 => [u1,u2] );
  }).then( result => {
    if(!result[1] && !result[2]) {
      console.log('register user');
      registerService.registerUser(req.body,res);
     // console.log(successRegister);
    //  return res.status(400).json(successRegister);
    } else {
      if(result[2]) errors.username = errorNames.USERNAME_EXIST;
      if(result[1])	errors.email = errorNames.EMAIL_EXIST;
      return res.status(400).json(errors);  
    }
  })
}