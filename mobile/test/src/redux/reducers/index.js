
import { combineReducers } from 'redux';
import  erorrsLoginReducer from './errors.login.reducer';
import  erorrsRegisterReducer from './errors.register.reducer';
import  authLoginReducer from './auth.login.reducer';
import  forgotPasswordReducer from './forgotPassword.reducer';
import  securityPasswordReducer from './secutiry.reducer';


// combine all reducers from another module
export default combineReducers({
  erorrsLoginReducer,
  authLoginReducer,
  erorrsRegisterReducer,
  forgotPasswordReducer,
  securityPasswordReducer
});