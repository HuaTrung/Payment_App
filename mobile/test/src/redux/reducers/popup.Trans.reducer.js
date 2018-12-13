import { POPUP_TRANSACTION } from '../actions/types';
const initialState = {
  trans: false
 };

const updateTransReducer = (state = initialState , action) => {
  switch(action.type) {
    case POPUP_TRANSACTION:
      return {
        ...state,
        trans: action.payload
      }   
    default: return state;
  }
};

export default updateTransReducer;