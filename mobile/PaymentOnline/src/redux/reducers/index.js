
import { combineReducers } from 'redux';
import  erorrsLogin from './errors.login.reducer';
// combine all reducers from another module
export default combineReducers({
  erorrsLogin
});