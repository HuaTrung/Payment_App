import { UPDATE_USER_MONEY_DATA } from '../actions/types';
import { queryUserMoney } from "../../realm/userQueries";
const initialState = {
  money: 0
 };

const updateUserReducer = (state = initialState , action) => {
  switch(action.type) {
    case UPDATE_USER_MONEY_DATA:
      return {
        ...state,
        money: action.payload
      }   
    default: return state;
  }
};

export default updateUserReducer;