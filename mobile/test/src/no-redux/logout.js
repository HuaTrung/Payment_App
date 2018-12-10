import axios from "axios";
import GLOBAL from "../config";
import { deleteUserLogout ,queryUserId, isEmptyUserLogin, queryUserPhone, queryUserOnline, updateUserOnline } from "../realm/userQueries";

import dev from "react-native-device-info";

const logout = () => new Promise( (resolve,reject) => {
  if(isEmptyUserLogin()) return;
  let id = queryUserId();

  axios.post(GLOBAL.HostName + "/app/user/offline",{id});
  axios.post(GLOBAL.HostName + "/app/user/logout",{id})
  .then( response => {
    let { data } = response;
    if(data.status == 0) resolve();
    else reject();
  }).catch(err=> reject());
})

export const block = () => new Promise( (resolve,reject) => {
  let id = queryUserId();
  axios.post(GLOBAL.HostName + "/app/user/block",{id})
  .then( response => {
    let { data } = response;
    if(data.status == 0) {
      // delete user
      deleteUserLogout().then( ()=> resolve(true) )
    }
    else {
      
    }
  }).catch(err=> console.log(err));
})

export const offline = () => {
  if(isEmptyUserLogin()) return;
  if(!queryUserOnline()) return;

  let id = queryUserId();
  axios.post(GLOBAL.HostName + "/app/user/offline",{id})
  .then( response => updateUserOnline(id,false))
}

export const online = () => {
  if(isEmptyUserLogin()) return;
  if(queryUserOnline()) return;
  let id = queryUserId();
  let phone = queryUserPhone();
  axios.post(GLOBAL.HostName + "/app/user/online",{id,phone})
  .then( response => updateUserOnline(id,true))
}
export default logout;