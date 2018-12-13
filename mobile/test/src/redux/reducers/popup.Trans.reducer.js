import { POPUP_TRANSACTION } from '../actions/types';
const initialState = {
  trans: false,
  tranID: "",
  money:0,
  description:""
 };

const updateTransReducer = (state = initialState , action) => {
  switch(action.type) {
    case POPUP_TRANSACTION:
      return {
        ...state,
        trans: true,
        tranID:action.payload.tranID,
        money:action.payload.money,
        description:action.payload.description
      }   
    default: return state;
  }
};

export default updateTransReducer;