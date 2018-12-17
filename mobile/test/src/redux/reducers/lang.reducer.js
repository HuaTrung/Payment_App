import { CHANGE_LANGUAGE } from '../actions/types';
import { isEmptySetting, querySettingLanguage } from "../../realm/userQueries";
const initialState = {
  lang: 0
 };

const updateLanguage = (state = initialState , action) => {
  switch(action.type) {
    case CHANGE_LANGUAGE:
    {
      return {
        ...state,
        lang: action.payload
      }  
    }
    default: return state;
  }
};

export default updateLanguage;