import axios from 'axios';

import isEmpty from '../../validations/is-empty.validate';
import { 
  USERNAME_EMPTY,
  USERNAME_FIRST_NUMBER, 
  PASSWORD_EMPTY, 
  EMAIL_PHONE_EMPTY, 
  EMAIL_PHONE_INVALID
} from '../../validations/errors-name';
import isEmail from '../../validations/email.validate';

import { 
  GET_LOGIN_ERRORS, 
  LOGIN_SUCCESS , 
  FORGOT_PASSWORD, 
  SEND_FORGOT_PASSWORD_SUCCESS
} from './types';

/**
 * @description If every thing we all send to server to validate, server will big and not response quickly
 * => make app not good 
 */
const loginUser = data => dispatch => {

  data = {
    "emailOrPhone" : "15520884@gm.uit.edu.vn",
    "password" : "Lexuantien1997",
    "type" : "email"
  };

  let errors = {}, type = '';
  //alert(data);
  for(let key in data) data[key] = data[key].trim();        
  
  if(isEmpty(data.emailOrPhone)) errors.emailOrPhone = EMAIL_PHONE_EMPTY;
  else
    (isEmail(data.emailOrPhone) == false )
      ? ((isNaN(data.emailOrPhone) == true) ? errors.emailOrPhone = EMAIL_PHONE_INVALID : type = 'phone') 
      : type = 'email';

  if(isEmpty(data.password)) errors.password = PASSWORD_EMPTY;
 // alert(JSON.stringify(errors));
  if(!isEmpty(errors)) {
    dispatch(setErrorLogin(errors));
  } else {    
    data.type = type;
    axios.post('http://192.168.0.102:5000/app/user/login', data)
    .then( response => {
      let { data } = response;
      if(data.status == 0 && !isEmpty(data.user)) dispatch(setSuccessLogin(data.user));  
      else if(data.status == 1 &&  !isEmpty(data.errors)) dispatch(setErrorLogin(data.errors)); 
    }).catch( err => console.warn(err));
  }
}

const resetErrorLogin = data => dispatch => {
  dispatch(setErrorLogin(data));        
}

const resetErrorGetPassword = errors => dispatch => {
  dispatch(setForgotPassword(errors));        
}

const getForgotPassword = emailOrPhone => dispatch => {
  let errors = {}, type = '';
  emailOrPhone = emailOrPhone.trim();
  if(isEmpty(emailOrPhone)) errors.emailOrPhone = EMAIL_PHONE_EMPTY;
  else
    (isEmail(emailOrPhone) == false )
      ? ((isNaN(emailOrPhone) == true) ? errors.emailOrPhone = EMAIL_PHONE_INVALID : type = 'phone') 
      : type = 'email';
  if(!isEmpty(errors)) {
    dispatch(setForgotPassword(errors));
  } else {
    axios.post('http://192.168.1.108:5000/app/user/forgot-password',{emailOrPhone, type})
    .then( response => {
      let { data } = response;
      // if(data.status == 0 && !isEmpty(data.user)) dispatch(setSuccessLogin(data.user));  
      // else 
      alert(JSON.stringify(data));
      if(data.status == 1 &&  !isEmpty(data.errors)) dispatch(setForgotPassword(data.errors));
      else if(data.status == 0 && isEmpty(data.errors)) dispatch(setSuccessForgotPass(data));
    }).catch( err => console.warn(err));
  }
};

const setErrorLogin = errors => {
  return {
    type: GET_LOGIN_ERRORS,
    payload: errors
  };
}

const setForgotPassword = errors => {
  return {
    type: FORGOT_PASSWORD,
    payload: errors
  };
}

const setSuccessLogin = data => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
}

const setSuccessForgotPass = data => {
  return {
    type: SEND_FORGOT_PASSWORD_SUCCESS,
    payload: data
  };
}

export { loginUser, resetErrorLogin, getForgotPassword, resetErrorGetPassword};