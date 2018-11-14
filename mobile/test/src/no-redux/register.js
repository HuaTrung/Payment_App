import axios from 'axios';
import GLOBAL from "../config";
import isEmpty from '../validations/is-empty.validate';
import isEmail from '../validations/email.validate';
import { 
  NAME_EMPTY,
  PASSWORD_EMPTY, 
  PASSWORD_NOT_ENOUGH,
  PASSWORD_NOT_UPPER_CHARACTER,
  PASSWORD_NOT_LOWER_CHARACTER,
  PASSWORD_TOO_STRENGTH,

  VERIFY_CODE_EMPTY,

  CONFIRM_PASSWORD_EMPTY,
  CONFIRM_PASSWORD_INCORRECT,

  PHONE_EMPTY , 
  PHONE_INVALID ,

} from '../validations/errors-name';


function checkErrorBeforeRegister(data) {
  let errors = {}, uppperCase = /[A-Z]/, lowerCase = /[a-z]/;
  if(isEmpty(data.name)) errors.name = NAME_EMPTY;

  if(isEmpty(data.phone)) errors.phone = PHONE_EMPTY;
  else if(isNaN(data.phone)) errors.phone = PHONE_INVALID;   

  if(isEmpty(data.verifyCode)) errors.verifyCode = VERIFY_CODE_EMPTY;
  
  if(isEmpty(data.password)) errors.password = PASSWORD_EMPTY;
  else { // regex password
    if(data.password.length < 8) errors.password = PASSWORD_NOT_ENOUGH; 
    else  {
      if(data.password.length < 16) {
        if(!uppperCase.test(data.password)) errors.password = PASSWORD_NOT_UPPER_CHARACTER;
        else  {
          if(!lowerCase.test(data.password)) errors.password = PASSWORD_NOT_LOWER_CHARACTER;
        }
      } else errors.password = PASSWORD_TOO_STRENGTH;
    }
  }

  if(isEmpty(data.confirmPassword))  errors.confirmPassword = CONFIRM_PASSWORD_EMPTY;
  else if(data.confirmPassword != data.password )  errors.confirmPassword = CONFIRM_PASSWORD_INCORRECT;
  return errors;
}

/**
 * @description If every thing we all send to server to validate, server will big and not response quickly
 * => make app not good 
 * @param Phone later we will send verify code to check it is true phone
 * @param 
 */
const registerUser = data => new Promise((resolve,reject) => {
  let errors = {};
  for(let key in data) data[key] = data[key].trim();        
  
  errors = checkErrorBeforeRegister(data);
  if(!isEmpty(errors)) resolve({ type: false, errors });  
  else {
    axios.post(GLOBAL.HostName +"/app/user/register",data)
    .then(response => response.json())
    .then( response => {
      let {data} = response;
      if(data.status == 0 && isEmpty(data.errors)) resolve({type: true}); // success
      else if(data.status == 1 && !isEmpty(data.errors)) resolve({ type: false, errors: data.errors }); // fail
    })
    .catch( err =>  reject(err));
  }
})

const checkPhoneError = phone => new Promise((resolve,reject) => {
  let errors = {};
  if(!isNaN(phone)) {
    errors.phone = PHONE_INVALID;
    resolve({ type: false, errors});
  } else {
    axios.post(GLOBAL.HostName +"/app/user/send-verify", {phone})
    .then(response => response.json()) // do later
    .catch( err => reject(err));
  } 
});

export { registerUser, checkPhoneError };