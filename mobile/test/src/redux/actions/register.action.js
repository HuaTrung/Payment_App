import axios from 'axios';

import isEmpty from '../../validations/is-empty.validate';
import { 
  NAME_EMPTY,
  USERNAME_EMPTY, 
  
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

} from '../../validations/errors-name';

import { GET_REGISTER_ERRORS, LOGIN_SUCCESS } from './types';

/**
 * @description If every thing we all send to server to validate, server will big and not response quickly
 * => make app not good 
 * @param Phone later we will send verify code to check it is true phone
 * @param 
 */
const registerUser = data => dispatch => {
  alert(JSON.stringify(data));
  let errors = {};
  let uppperCase = /[A-Z]/;
  let lowerCase = /[a-z]/;
  for(let key in data) data[key] = data[key].trim();        
  
  if(isEmpty(data.username)) errors.username  = USERNAME_EMPTY;

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

  if(!isEmpty(errors)) {
    dispatch(setErrorRegister(errors));
  }

}

const resetErrorRegister = data => dispatch => {
  dispatch(setErrorRegister(data));        
}

const setErrorRegister = errors => {
  return {
    type: GET_REGISTER_ERRORS,
    payload: errors
  };
}

const setSuccessLogin = data => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
}

export { registerUser, resetErrorRegister };