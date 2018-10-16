import { GET_REGISTER_ERRORS } from '../actions/types';
const initialState = { };

const errorsReducer = (state = initialState , action) => {
  switch(action.type) {
    case GET_REGISTER_ERRORS:
      return action.payload;
    default: return state;
  }
};

export default errorsReducer;