import axios from 'axios';
import { SET_CURRENT_ACCOUNT , GET_LOGIN_ERRORS }  from './types'
import setAuthToken  from 'admin-module/src/utils/setAuthToken';
import jwt_decode from 'jwt-decode';

const loginAccountAdmin = accountAdmin => dispatch => {
    
    console.log(accountAdmin);


    // fetch('http://localhost:5000/secure/login',{
    //     method: 'POST',
    //     body: accountAdmin,
    //     mode: 'cors'
    // })
    // .then( (response) => {
    //     if(response.ok){
    //         return response.json();
    //     }else{
    //         throw new Error('BAD HTTP stuff');
    //     }
    // })
    // .then( res => {
    //     console.log(res);
    //     // save data to local storage
    //     const { token } = res.data;
    //     localStorage.setItem('jwtToken',token);
    //     // set token to auth header:
    //     setAuthToken(token);
    //     // use jwt-decode to decode token to get id, name, image
    //     const decoded = jwt_decode(token);
    //     // set current account:
    //     dispatch(setCurrentAccount(decoded));
    // })
    // .catch(err=>{ // status 404 || 400
    //     dispatch({ // submit action => to reducer
    //         type: GET_LOGIN_ERRORS,
    //         payload: err.response.data
    //     });
    // });


    axios.post("http://localhost:5000/secure/login",accountAdmin)
        .then( res => {
            console.log(res);
            // save data to local storage
            const { token } = res.data;
            localStorage.setItem('jwtToken',token);
            // set token to auth header:
            setAuthToken(token);
            // use jwt-decode to decode token to get id, name, image
            const decoded = jwt_decode(token);
            // set current account:
            dispatch(setCurrentAccount(decoded));
        })
        .catch(err=>{ // status 404 || 400
            dispatch({ // submit action => to reducer
                type: GET_LOGIN_ERRORS,
                payload: err.response.data
            });
        });
}

const logoutAccountAdmin = () => dispatch => {
    // remove token from local storage
    localStorage.removeItem('jwtToken');
    // remove auth header for future request
    setAuthToken(false);
    //set account to empty
    dispatch(setCurrentAccount({}));
}

// set loggin account
const setCurrentAccount = decoded => {
    return {
        type: SET_CURRENT_ACCOUNT,
        payload: decoded 
    }
}

export { setCurrentAccount, loginAccountAdmin, logoutAccountAdmin };