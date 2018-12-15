
import { combineReducers } from 'redux';
import  erorrsLoginReducer from './errors.login.reducer';
import  erorrsRegisterReducer from './errors.register.reducer';
import  authLoginReducer from './auth.login.reducer';
import  forgotPasswordReducer from './forgotPassword.reducer';
import  securityPasswordReducer from './secutiry.reducer';
import  updatedataReducer from './updatedata.reducer';
import  popupTransReducer from './popup.Trans.reducer';
import  langReducer from './lang.reducer';
// combine all reducers from another module
export default combineReducers({
  erorrsLoginReducer,
  authLoginReducer,
  erorrsRegisterReducer,
  forgotPasswordReducer,
  securityPasswordReducer,
  updatedataReducer,
  popupTransReducer,
  langReducer
});