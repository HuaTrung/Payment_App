import { queryUserId } from "../realm/userQueries";
import  GLOBAL from "../config/index";
import axios from "axios";

export const register_PIN = (securityPass) => new Promise((resolve,reject) => {
  let id = queryUserId();
 // alert(JSON.stringify({id,securityPass}));
  axios
    .post( GLOBAL.HostName + "/app/user/register-PIN/", { id, securityPass })
    .then( response => {
      let { data } = response;
      resolve(data);
    }).catch(err => reject(err));
});