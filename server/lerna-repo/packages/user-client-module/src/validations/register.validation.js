const isEmpty = require('./is-empty.validate');
const errorsName = require('./errors-name');

const Validator = require('the_root/node_modules/validator');


const enoughRegex = new RegExp("(?=.{6,}).*", "g");

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function ValidateRegister(data) {
    
    let errors = {};
    for(let key in data) data[key] = data[key].trim();        
    

    console.log(data);

    if(isEmpty(data.username)) 
        errors.username  = errorsName.USERNAME_EMPTY;
    
    if(!validateEmail(data.email)){
        errors.email  = errorsName.EMAIL_INVALID;
    } else if(isEmpty(data.email)) 
        errors.email = errorsName.EMAIL_EMPTY;
    

    if(isEmpty(data.phone)) 
        errors.phone = errorsName.PHONE_EMPTY;
    else if(!(/^\d+$/.test(data.phone))) 
        errors.phone = errorsName.PHONE_INVALID;   
    
    if(isEmpty(data.password)) 
        errors.password = errorsName.PASSWORD_EMPTY;
    else { // regex password
        if(enoughRegex.test(data.password) == false) {
            errors.password = errorsName.PASSWORD_NOT_ENOUGH;
        }
    }

    if(isEmpty(data.confirmPassword)) 
        errors.confirmPassword = errorsName.CONFIRM_PASSWORD_EMPTY;
    else if(data.confirmPassword != data.password ) 
        errors.confirmPassword = errorsName.CONFIRM_PASSWORD_INCORRECT;

    return { 
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = ValidateRegister 