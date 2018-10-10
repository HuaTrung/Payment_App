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
    for(let key in data) data[key] = data[key].trim();        
    
    console.log(data);
  
    if(isEmpty(data.phone)) 
      errors.phone = errorsName.EMAIL_PHONE_EMPTY;
    if(isEmpty(data.password)) 
      errors.password = errorsName.PASSWORD_EMPTY;

    return { 
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = ValidateLogin 