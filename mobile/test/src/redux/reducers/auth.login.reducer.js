import { LOGIN_SUCCESS } from '../actions/types';
const initialState = {
  isAuthenticated: false,
  user: { }
 };

const authReducer = (state = initialState , action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.payload ? true : false,
        user: action.payload
      }
    default: return state;
  }
};

export default authReducer;