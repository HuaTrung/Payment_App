import axios from 'axios';
import GLOBAL from "../config";
import isEmpty from '../validations/is-empty.validate';
import { 
  USERNAME_EMPTY,
  USERNAME_FIRST_NUMBER, 
  PASSWORD_EMPTY, 
  EMAIL_PHONE_EMPTY, 
  EMAIL_PHONE_INVALID
} from '../validations/errors-name';
import isEmail from '../validations/email.validate';

import { insertUserLogin } from "../realm/userQueries";

function checkErrorBeforeLogin(data) {
  let errors = {}, type = '';
  if(isEmpty(data.emailOrPhone)) errors.emailOrPhone = EMAIL_PHONE_EMPTY;
  else
    (isEmail(data.emailOrPhone) == false )
      ? ((isNaN(data.emailOrPhone) == true) ? errors.emailOrPhone = EMAIL_PHONE_INVALID : type = 'phone') 
      : type = 'email';
  if(isEmpty(data.password)) errors.password = PASSWORD_EMPTY;
  
  return {
    errors : errors,
    type : type
  };
}

/**
 * @description If every thing we all send to server to validate, server will big and not response quickly
 * => make app not good 
 */
const loginUser = data  => new Promise((resolve, reject) => {
 
  let resultCheckErrorBeforeLogin = {};
  for(let key in data) data[key] = data[key].trim();        
  resultCheckErrorBeforeLogin = checkErrorBeforeLogin(data); // check the error like empty pass, name and detect type login
  if(!isEmpty(resultCheckErrorBeforeLogin.errors)) resolve({type: false, errors: resultCheckErrorBeforeLogin.errors}); // send errors to user
  else {    
    data.type = resultCheckErrorBeforeLogin.type; // check user login with email or phone
    // send data to server


    axios.post(GLOBAL.HostName +"/app/user/login",data)
    .then( response => {
      let { data } = response; // get the response from server send to
      if(data.status == 0 && !isEmpty(data.user)) // Insert user login to realm database
        insertUserLogin(data.user).then(() => resolve({type: true})).catch((err)=> alert(err));      
      else if(data.status == 1 &&  !isEmpty(data.errors)) resolve({type: false, errors: data.errors}); // send errors to user
    }).catch( err => console.error(err));
  }
});

const getForgotPassword = emailOrPhone => new Promise((resolve, reject) => {
  let errors = {}, type = '';
  emailOrPhone = emailOrPhone.trim();
  if(isEmpty(emailOrPhone)) errors.emailOrPhone = EMAIL_PHONE_EMPTY;
  else
    (isEmail(emailOrPhone) == false )
      ? ((isNaN(emailOrPhone) == true) ? errors.emailOrPhone = EMAIL_PHONE_INVALID : type = 'phone') 
      : type = 'email';
  if(!isEmpty(errors)) resolve({ type: false, errors}); // send error
  else {
    axios.post(GLOBAL.HostName + "/app/user/forgot-password",{emailOrPhone, type})
    .then( response => {
      let { data } = response;
      if(data.status == 1 &&  !isEmpty(data.errors)) resolve({type:false,errors: data.errors}); // send error
      else if(data.status == 0 && isEmpty(data.errors)) resolve({type: true}); // send success
    }).catch( err => console.warn(err));
  }
});

export { loginUser, getForgotPassword };