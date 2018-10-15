const loginValidate = require('../validations/login.validation');
const loginService = require('../services/login.service');
const errorNames = require('../validations/errors-name');

const passwordCrypt = require('../utils/password.crypt');

const api = {
  status: 1,
  errors: {},
  user: {}
};

function logError(info, data,res,errors) {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  switch (info) {
    case 'SERVER_DIE':
      api.status = 1;
      api.user = null;    
      return res.status(400).json(api); 
  }
}
/**
 * @description To login we will check:
 * 
 */
function login(user,password,res) {
  if(user) {
    if(user.verified) {
      if(passwordCrypt.comparePassowrd(password,user.password)) {
        api.status = 0;
        // console.log(user);
        api.user = user;    
        api.errors = {};
        console.log(user._id +' login');
        return res.status(200).json(api);   
      } else {
        api.status = 1;
        api.errors.password = errorNames.PASSWORD_NOTCORRECT;
        api.user = {};
        return res.status(400).json(api);   
      }      
    } else {
      api.status = 1;
      api.errors.verified = errorNames.NOT_VERIFY;
      api.user = {};    
      return res.status(400).json(api);   
    }
  } else {
    api.status = 1;
    api.errors.emailPhone = errorNames.EMAIL_PHONE_INVALID;
    api.user = {};     
    return res.status(400).json(api); 
  }
}

module.exports = (req,res) => {
  console.log(req.body);
  
  for(let key in req.body) req.body[key] = req.body[key].trim();   

  if(req.body.type == 'email') {
    loginService.checkEmail(req.body.emailPhone).then (user => {
      login(user,req.body.password,res);
    });   
  } else if(req.body.type == 'phone') {
    loginService.checkPhone(req.body.emailPhone).then (user => {
      login(user,req.body.password,res);
    });      
  }
}