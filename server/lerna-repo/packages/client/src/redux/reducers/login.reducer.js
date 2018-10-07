import  { SET_CURRENT_ACCOUNT } from '../actions/types';
import  isEmpty from 'admin_module/src/validations/is-empty.validate';
const initialState = {
    isAuthenticated: false,
    account: {}
};

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_CURRENT_ACCOUNT:
            return {
                ...state, // support for es6, can't fix right now
                isAuthenticated: !isEmpty(action.payload),
                account: action.payload
            };
        default: return state;
    }
};

export default loginReducer;