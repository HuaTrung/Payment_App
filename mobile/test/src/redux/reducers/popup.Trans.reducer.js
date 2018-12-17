import { POPUP_TRANSACTION } from '../actions/types';
const initialState = {
  trans: false,
  type: "",
  money:0,
  name:"",
  dateTrans: "",
  description:""
 };
const updateTransReducer = (state = initialState , action) => {
  switch(action.type) {
    case POPUP_TRANSACTION:
      return {
        ...state,
        trans: true,
        type:action.payload.type,
        money:action.payload.money,
        name:action.payload.name,
        dateTrans:action.payload.dateTrans,
        description:action.payload.description
      }   
      case "UNPOPUP_TRANSACTION":
      return {
        ...state,
        trans: false,
      }   
    default: return state;
  }
};

export default updateTransReducer;