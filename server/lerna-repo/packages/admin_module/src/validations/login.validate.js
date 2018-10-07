const isEmpty = require('./is-empty.validate');
const errorsName = require('./errors-name');

const Validator = require('the_root/node_modules/validator');
const bcrypt = require('the_root/node_modules/bcryptjs');

function ValidateLogin(data) {
    
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password: '';

    if(!Validator.isEmail(data.email)){
        errors.email  = errorsName.EMAIL_INVALID;
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = errorsName.EMAIL_EMPTY;
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = errorsName.PASSWORD_EMPTY;
    }

    return { 
        errors,
        isValid: isEmpty(errors)
    };

}

function ComparePassword(clientPassword, accountPassword) {
    bcrypt.compare(clientPassword,accountPassword).then( isMatch => { return isMatch;});
}

module.exports = {
    ValidateLogin ,
    ComparePassword
}