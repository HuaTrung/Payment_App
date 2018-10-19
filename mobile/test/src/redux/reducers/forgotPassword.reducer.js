import { FORGOT_PASSWORD, SEND_FORGOT_PASSWORD_SUCCESS } from '../actions/types';
const initialState = { 
  errors: {},
  isSendForgotPassword: false
};

const forgotPasswordReducer = (state = initialState , action) => {
  switch(action.type) {
    case FORGOT_PASSWORD:
      return {
        ...state,
        errors: action.payload
      }
    case SEND_FORGOT_PASSWORD_SUCCESS: 
      return {
        ...state,
        isSendForgotPassword: action.payload ? true : false
      }
    default: return state;
  }
};

export default forgotPasswordReducer;