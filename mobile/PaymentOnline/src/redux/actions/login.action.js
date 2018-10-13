import axios from 'axios';

import { GET_LOGIN_ERRORS } from './types';

const loginUser = user => dispatch => {

  console.log('user send to login from mobile: ', user);

  // axios.post('http://localhost:5000/app/user/login',user)
  //   .then( response => {
      
  //   })
  //   .catch( err => {

  //   });
}

export { loginUser };