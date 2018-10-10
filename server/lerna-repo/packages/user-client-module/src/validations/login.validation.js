const isEmpty = require('./is-empty.validate');
const errorsName = require('./errors-name');

const Validator = require('the_root/node_modules/validator');


const enoughRegex = new RegExp("(?=.{6,}).*", "g");

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function ValidateLogin(data) {
    
    let errors = {};
    let isEmail = 0;
    for(let key in data) data[key] = data[key].trim();        
    // console.log(data);
  
    if(isEmpty(data.emailPhone)) 
      errors.emailPhone = errorsName.EMAIL_PHONE_EMPTY;
    else {
      if(!validateEmail(data.emailPhone)){
        if(/^\d+$/.test(data.emailPhone)) isEmail = 2;        
      } else isEmail = 1;
    }
    if(isEmpty(data.password)) 
      errors.password = errorsName.PASSWORD_EMPTY;

    return { 
        errors,
        isEmail,
        isValid: isEmpty(errors)
    };

}


module.exports = ValidateLogin ;