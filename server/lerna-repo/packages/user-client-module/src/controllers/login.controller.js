const loginValidate = require('../validations/login.validation');
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

module.exports = (res,req) => {
  
  let { errors, isValid } = loginValidate(req.body);

  if(!isValid) {
    api.errors = errors;
    return res.status(400).json(api); 
  }

  const checkEmailPhone = loginValidate.checkEmailPhone(req.body.emailPhone,(info, data) => logError(info,data,res,errors))
 
  if(checkEmailPhone) {
    api.status = 0;
    api.user = checkEmailPhone;    
    return res.status(200).json(api); 
  } else {
    api.errors.emailPhone = errorNames.EMAIL_PHONE_INVALID;    
    return res.status(200).json(api); 
  }
}