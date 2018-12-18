import axios from "axios";
import GLOBAL from "../config";
import { deleteUserLogout ,queryUserId, isEmptyUserLogin, queryUserPhone, queryUserOnline } from "../realm/userQueries";
import firebase from "react-native-firebase";
import dev from "react-native-device-info";
import { AsyncStorage } from "react-native";
const logout = () => new Promise( (resolve,reject) => {
  
  let id = queryUserId();
  axios.post(GLOBAL.HostName + "/app/user/logout",{id})
  .then( response => {
    let { data } = response;
    if(data.status == 0) {
      console.log("log out");
      firebase.database().ref("user/" + id).off("child_changed");
      AsyncStorage.removeItem('RUN_ONCE').then(()=>{
        resolve();
      });
    }
    else reject();
  }).catch(err=> reject());
})

export const block = () => new Promise( (resolve,reject) => {
  console.log("block");
  let id = queryUserId();
  axios.post(GLOBAL.HostName + "/app/user/logout",{id})
  .then( response => {
    let { data } = response;
    if(data.status == 0) {
      // delete user
      deleteUserLogout().then( ()=> resolve() )
    }
    else {
      
    }
  }).catch(err=> console.log(err));
})

export default logout;