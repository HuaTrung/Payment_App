const registerValidate = require('../validations/register.validation');
const registerService = require('../services/register.service');

const User = require('../../../the_root/MongoModel/app/user');
const errorNames = require('../validations/errors-name');

const config = require('the_root/config');


function logError(info, data,errors,res) {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  switch (info) {
    case 'MONGO_DATA_ID':
      api = { 
        status: 0,
        errors,
        user_id: data
      };
      return res.status(400).json(api); 
  }
}

/**
 * @description: register client user by:
 * 1: Check information client send is correctly or not (logic)
 *      + If error -> response errors to client user
 *      + If not -> continue   
 * 2. Check user name / email is used or not by access database
 *      + If error -> response errors to client user
 *      + If not -> continue   
 * 3. Register successfully
 * 4. Check verify code by using authy
 *      + 1 code just exist about 20 second
 *      + Can send again
 */
module.exports =  (req,res) => {
  // api response to app
  // status: 0 -> success
  // status: 1 -> found error
  let api = {
    status: 0,
    errors: null,
    user_id: null
  };

	// get all errors when user submit regiser:
	// console.log(req.body);
	let { errors, isValid } = registerValidate(req.body);
  // can continue to b2?
  // 400 mean you can get the error
	if(!isValid) {
    api = { 
      status: 1,
      errors: errors,
      user_id: null
    };
    return res.status(400).json(api); 
  }

	let { username, email } = req.body;
  //	console.log(req.body);
	// Check user name / email is used or not by access database
  registerService.checkEmailExist(email).then( u1 => {
    return registerService.checkUserNameExist(username).then( u2 => [u1,u2] );
  }).then( result => {
    if(!result[1] && !result[2]) {
      console.log('register user');
      registerService.registerUser(req.body,'VN', (info, data) => logError(info,data,errors,res));
    } else {
      if(result[2]) errors.username = errorNames.USERNAME_EXIST;
      if(result[1])	errors.email = errorNames.EMAIL_EXIST;
      api = {
        status: 1,
        errors,
        user_id: null
      }
      return res.status(400).json(api);  
    }
  })
}