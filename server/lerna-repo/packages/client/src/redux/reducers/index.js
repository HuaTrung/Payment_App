// root of reducers

import { combineReducers } from 'redux';
import loginReducer from './login.reducer'; 
import errorsReducer from './errors.reducer'; 
import usertouserReducer from './usertouser.reducer'
// combine all reducers from another module
export default combineReducers({
    usertouserReducer
    // loginReducer,
    // errorsReducer    
});