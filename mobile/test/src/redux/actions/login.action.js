import axios from 'axios';

import isEmpty from '../../validations/is-empty.validate';
import { USERNAME_EMPTY,USERNAME_FIRST_NUMBER, PASSWORD_EMPTY} from '../../validations/errors-name';
import isEmail from '../../validations/email.validate';

import { GET_LOGIN_ERRORS, LOGIN_SUCCESS } from './types';

/**
 * @description If every thing we all send to server to validate, server will big and not response quickly
 * => make app not good 
 */
const loginUser = data => dispatch => {

  let errors = {}

  for(let key in data) data[key] = data[key].trim();        
  
  if(isEmpty(data.username)) errors.username = USERNAME_EMPTY;
  else if( /[0-9]/.test(data.username.charAt(0))) errors.username = USERNAME_FIRST_NUMBER;

  if(isEmpty(data.password)) errors.password = PASSWORD_EMPTY;
 // alert(JSON.stringify(errors));
  if(!isEmpty(errors)) {
    dispatch(setErrorLogin(errors));
  } else {    
    axios.post('http://192.168.1.108:5000/app/user/login',data)
    .then( response => {
      let { data } = response;
      if(data.status == 0 && data.user != null) dispatch(setSuccessLogin(data.user));        
    })
    .catch( err => {
      // alert(JSON.stringify(err.response.data));
      let { data } = err.response;
      if(data.status == 1 && data.errors != null)  dispatch(setErrorLogin(data.errors));        
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