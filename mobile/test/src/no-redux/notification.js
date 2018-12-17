import firebase from "react-native-firebase";
import type { RemoteMessage, Notification,NotificationOpen } from "react-native-firebase";
import { queryUserId, updateMoney, updateSecurityPass, deleteUserLogout, isEmptyUserLogin } from "../realm/userQueries";
import { AppState, AsyncStorage, View, Text, StyleSheet } from "react-native";
import logout,{ block } from "./logout";
import { UPDATE_USER_MONEY_DATA, POPUP_TRANSACTION } from '../redux/actions/types';
import store from "../redux/store";
import  GLOBAL  from "../config/index";
import axios from "axios";
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
  // Prevent loop Listener Notification
  // This will make Notification run only once time in app's life cycle
  // AsyncStorage.getItem('RUN_ONCE').then(value => {
    // if(value == null) {      
      // AsyncStorage.setItem('RUN_ONCE','1').then(() => {
        // Listen all notifications that not need Authentication
        firebase.messaging().subscribeToTopic("NOTIFICATION");
        // Listen notifications that need Authentication
        firebase.notifications().onNotification(notification => {
          console.log(notification._data);
          notification
          .setSound("default")
          .android.setPriority(firebase.notifications.Android.Priority.Max)
          .android.setChannelId('channelId')
          firebase.notifications().displayNotification(notification);
          
          if(!isEmptyUserLogin()) { // popup when user logined
            switch (notification._data.type) {
              case "RECEIVE_TRANSACTION":
              {
                let { tranID, money, description } = notification._data;
                let value = { tranID, money, description }
                store.dispatch({
                  type: POPUP_TRANSACTION,
                  payload: value
                })
              }
              break;
            }
         }
        });
        // Handle when notification is clicked to Open
        // This is for FOREGROUND
        firebase.notifications().onNotificationOpened(notificationOpen => {
          if(notificationOpen) {
            switch (notificationOpen.notification._data.action) {
              case "ALERT":
              {
                alert('ALERT');
              }
              break;
            }
            console.log("onNotificationOpened");
          } else {
            console.log("NOT onNotificationOpened")
          }
        })
        firebase.notifications().getInitialNotification(notificationOpen => {
          if(notificationOpen) {
            console.log(notificationOpen);
            console.log("getInitialNotification 11111111111111111111111111111111111")
          } else {
            console.log("NOT getInitialNotification")
          }
        })
      // });
    // }
  // })
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

}

export const _fetchNewNotification = () => {
  let uid = queryUserId();
  axios
    .post(GLOBAL.HostName +"/app/user/fetch-notification",{uid})
    .catch( err => console.error(err));
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

