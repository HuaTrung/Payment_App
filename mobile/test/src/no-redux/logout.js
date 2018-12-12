import axios from "axios";
import GLOBAL from "../config";
import { deleteUserLogout ,queryUserId, isEmptyUserLogin, queryUserPhone, queryUserOnline } from "../realm/userQueries";
import firebase from "react-native-firebase";
import dev from "react-native-device-info";

const logout = () => new Promise( (resolve,reject) => {
  if(isEmptyUserLogin()) return;
  let id = queryUserId();
  axios.post(GLOBAL.HostName + "/app/user/logout",{id})
  .then( response => {
    let { data } = response;
    if(data.status == 0) {
      firebase.database().ref("user/" + id).off("child_changed");
      resolve();
    }
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

export default logout;