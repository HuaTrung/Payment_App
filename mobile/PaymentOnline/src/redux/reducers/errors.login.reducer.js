import { GET_LOGIN_ERRORS } from '../actions/types';
const initialState = { };

const errorsReducer = (state = initialState , action) => {
  switch(action.type) {
    case GET_LOGIN_ERRORS:
      return action.data;
    default: return state;
  }
};

export default errorsReducer;