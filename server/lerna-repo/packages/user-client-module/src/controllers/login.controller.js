const loginValidate = require('../validations/login.validation');
const loginService = require('../services/login.service');
const errorNames = require('../validations/errors-name');

const api = {
  status: 1,
  errors: null,
  user: null
};

function logError(info, data,res,errors) {
  console.log('info: '+ info +' - data: ' + JSON.stringify(data));
  switch (info) {
    case 'SERVER_DIE':
      api.status = 1;
      return res.status(400).json(api); 
  }
}

function login(user,password,errors,res) {
  console.log(user);
  if(user) {
    if(user.verified) {
      if(password == user.password) {
        api.status = 0;
        api.user = user;    
        return res.status(200).json(api);   
      } else {
        errors.notCorrect  = errorNames.PASSWORD_NOTCORRECT;
        api.errors = errors;
        return res.status(200).json(api);   
      }      
    } else {
      errors.verified = errorNames.NOT_VERIFY;
      api.errors = errors;    
      return res.status(200).json(api);   
    }
  } else {
    errors.emailPhone = errorNames.EMAIL_PHONE_INVALID;
    api.errors = errors;     
    return res.status(200).json(api); 
  }
}

module.exports = (req,res) => {
  console.log(req.body);
  
  let { errors, isValid , isEmail} = loginValidate(req.body);

  if(!isValid) {
    api.errors = errors;
    return res.status(400).json(api); 
  }
  console.log(isEmail);
  if(isEmail == 1) {
    loginService.checkEmail(req.body.emailPhone).then (user => {
      login(user,req.body.password,errors,res);
    });   
  } else if(isEmail == 2) {
    loginService.checkPhone(req.body.emailPhone).then (user => {
      login(user,req.body.password,errors,res);
    });      
  } else {
    errors.emailPhone = errorNames.EMAIL_PHONE_INVALID;
    api.errors = errors;     
    return res.status(200).json(api); 
  }
}