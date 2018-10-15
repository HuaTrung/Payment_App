import axios from 'axios';

import isEmpty from '../../validations/is-empty.validate';
import { EMAIL_PHONE_EMPTY, EMAIL_PHONE_INVALID, PASSWORD_EMPTY} from '../../validations/errors-name';
import isEmail from '../../validations/email.validate';

import { GET_LOGIN_ERRORS, LOGIN_SUCCESS } from './types';

/**
 * @description If every thing we all send to server to validate, server will big and not response quickly
 * => make app not good 
 */
const loginUser = data => dispatch => {

  let errors = {}, type = '';

  for(let key in data) data[key] = data[key].trim();        
  
  if(isEmpty(data.emailPhone)) errors.emailPhone = EMAIL_PHONE_EMPTY;
  //  else {
  //   if(!isEmail(data.emailPhone)) { // not email
  //     if(isNaN(data.emailPhone))  // not phone => invalid
  //       errors.emailPhone = EMAIL_PHONE_INVALID;
  //     else errors.type = 'phone';
  //   } else errors.type = 'email';
  //  }
  else
    (isEmail(data.emailPhone) == false )
      ? ((isNaN(data.emailPhone) == true) ? errors.emailPhone = EMAIL_PHONE_INVALID : type = 'phone') 
      : type = 'email';

  if(isEmpty(data.password)) errors.password = PASSWORD_EMPTY;
 // alert(JSON.stringify(errors));
  if(!isEmpty(errors)) {
    dispatch(setErrorLogin(errors));
  } else {    
    data.type = type;
    axios.post('http://192.168.1.108:5000/app/user/login',data)
    .then( response => {
      let data = response.data;
      if(data.status == 0 && data.user != null) {
        // alert(JSON.stringify(data.user));
        dispatch(setSuccessLogin(data.user));        
      }
    })
    .catch( err => {
      // alert(JSON.stringify(err.response.data));
      let data = err.response.data;
      if(data.status == 1 && data.errors != null) {
        dispatch(setErrorLogin(data.errors));        
      }
    });
  }
}

const resetErrorLogin = data => dispatch => {
  dispatch(setErrorLogin(data));        
}

const setErrorLogin = errors => {
  return {
    type: GET_LOGIN_ERRORS,
    payload: errors
  };
}

const setSuccessLogin = data => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
}

export { loginUser, resetErrorLogin };