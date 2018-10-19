import axios from 'axios';

import isEmpty from '../../validations/is-empty.validate';
import { USERNAME_EMPTY,USERNAME_FIRST_NUMBER, PASSWORD_EMPTY, EMAIL_PHONE_EMPTY, EMAIL_PHONE_INVALID} from '../../validations/errors-name';
import isEmail from '../../validations/email.validate';

import { GET_LOGIN_ERRORS, LOGIN_SUCCESS , FORGOT_PASSWORD } from './types';

/**
 * @description If every thing we all send to server to validate, server will big and not response quickly
 * => make app not good 
 */
const loginUser = data => dispatch => {

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
    axios.post('http://192.168.1.108:5000/app/user/login',data)
    .then(response => response.json())
    .catch( err => console.warn(err))
    .then( response => {
      let { data } = response;
      if(data.status == 0 && !isEmpty(data.user)) dispatch(setSuccessLogin(data.user));  
      else if(data.status == 1 &&  !isEmpty(data.errors)) dispatch(setErrorLogin(data.errors)); 
    });
  }
}

const resetErrorLogin = data => dispatch => {
  dispatch(setErrorLogin(data));        
}

const resetErrorGetPassword = errors => dispatch => {
  dispatch(setForgotPassword(errors));        
}

const getForgotPassword = emailOrPhone => dispatch => {
  let errors = {};
  emailOrPhone = emailOrPhone.trim();
  if(isEmpty(emailOrPhone)) errors.emailOrPhone = EMAIL_PHONE_EMPTY;
  else
    (isEmail(emailOrPhone) == false )
      ? ((isNaN(emailOrPhone) == true) ? errors.emailOrPhone = EMAIL_PHONE_INVALID : type = 'phone') 
      : type = 'email';
  if(!isEmpty(emailOrPhone)) {
    dispatch(setForgotPassword(errors));
  } else {

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

export { loginUser, resetErrorLogin, getForgotPassword, resetErrorGetPassword};