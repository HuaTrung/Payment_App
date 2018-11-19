import { KEY_BOARD_CLICK, KEY_BOARD_DELETE_CLICK } from '../actions/types';
const initialState = { 
  password: ""
};

const securityPasswordReducer = (state = initialState , action) => {
  switch(action.type) {
    case KEY_BOARD_CLICK: 
      return {
        ...state,
        password: state.password + action.payload
      }
    case KEY_BOARD_DELETE_CLICK:
      return {
        ...state,
       password: state.password.slice(0, -1)
      }
    default: return state;
  }
};
export default securityPasswordReducer;