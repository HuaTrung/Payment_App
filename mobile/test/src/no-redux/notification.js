import firebase from "react-native-firebase";
import type { Notification, NotificationOpen, RemoteMessage} from "react-native-firebase";
import { queryUserId, updateMoney, updateSecurityPass, deleteUserLogout } from "../realm/userQueries";
import { AppState, AsyncStorage, View, Text, StyleSheet } from "react-native";
import  BackgroundTimer  from "react-native-background-timer";
import logout,{ block } from "./logout";
import { UPDATE_USER_MONEY_DATA, POPUP_TRANSACTION } from '../redux/actions/types';
import store from "../redux/store";

import Modal from "react-native-modal";

const onTokenRefreshListener = () => {
  firebase.messaging().onTokenRefresh(fcmToken => {
    // Process your token as required
    let uid = queryUserId();
    let token = firebase.database().ref("register-token/" + uid);
    token.update({
      token: fcmToken
    }, error => {
      if(error) console.log(JSON.stringify(error));
    })
    .then(data => console.log(data));
  });
}

const onMessageListener = () => {
  AsyncStorage.getItem('LOGIN').then(value => {
    if(value == null) {
      AsyncStorage.setItem('LOGIN','1').then(()=> {
        firebase.messaging().onMessage((message: RemoteMessage) => {
          console.log(JSON.stringify(message));         
          // Process your message as required
          switch (message.data.type) {
            case "RECEIVE_TRANSACTION":
            {
              let { tranID, money, description } = message.data;
              let value = {
                tranID,
                money,
                description
              }
              store.dispatch({
                type: POPUP_TRANSACTION,
                payload: value
              })
            }
            break;
          }
        });
      })
    }
  })
}

const hasPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    // user has permissions
    const token = await firebase.messaging().getToken();
    let uid = queryUserId();
    let tokens = firebase.database().ref("register-token/" + uid);
    tokens.update({
      token: token
    }, error => {
    if(error) console.log(JSON.stringify(error));
    }).then(data => console.log(data));
  } else {
    // user doesn't have permission
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
      alert('No permission for notification');
    }
  }
}

_handleBackground = (nextAppState) => {
  console.log("App is running at: " + nextAppState);
  // if(nextAppState == "background") {
  //   offline();
  //   BackgroundTimer.runBackgroundTimer(() => { 
  //     console.log("background")
  // },2000);
  // } else if(nextAppState =="active") {      
  //   online();
  //   BackgroundTimer.stopBackgroundTimer();  
  // }
}

export const onListenerData = () => new Promise((resolve,reject) => { 
  firebase.database().ref("user/" + queryUserId()).on("child_changed", function(snapshot) {
    console.log("____________________")
    console.log("Key: " + snapshot.key+" and "+snapshot.val() );
    if(snapshot.key == "money")
      updateMoney(snapshot.val()).then( value => {
        store.dispatch({
          type: UPDATE_USER_MONEY_DATA,
          payload: snapshot.val()
        })
        // let a = true;
        // store.dispatch({
        //   type: POPUP_TRANSACTION,
        //   payload: a
        // })
      });
    else if(snapshot.key == "type" && snapshot.val() == 1 ) // block:
      deleteUserLogout().then(() =>  resolve(1));
    else if(snapshot.key == "securityPass") // upadate local security pass:
      updateSecurityPass(snapshot.val()).then(() => resolve(2));
  });
})



const appStateAddEventListener = () => {
  AppState.addEventListener("change", this._handleBackground);
}

const AppStateRemoveEventListener = () => {
  AppState.removeEventListener("change", this._handleBackground);
}

export { 
  appStateAddEventListener,
  AppStateRemoveEventListener,
  hasPermission,
  onMessageListener,
  onTokenRefreshListener
};

