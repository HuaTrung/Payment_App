import firebase from "react-native-firebase";
import type { Notification, NotificationOpen, RemoteMessage} from "react-native-firebase";
import { queryUserId } from "../realm/userQueries";
import { AppState } from "react-native";
import  BackgroundTimer  from "react-native-background-timer";
import { offline, online, block } from "./logout";

const onTokenRefreshListener = () => {
  firebase.messaging().onTokenRefresh(fcmToken => {
    // Process your token as required
    let uid = queryUserId();
    let token = firebase.database().ref("register-token/" + uid);
    token.update({
      token: fcmToken
    }, error => {
    if(error) console.log(JSON.stringify(error));
    }).then(data => console.log(JSON.stringify(data)));
  });
}

const messageListener = () => new Promise((resolve,reject) =>{
  firebase.messaging().onMessage((message: RemoteMessage) => {
    console.log(JSON.stringify(message))
    // Process your message as required
    switch (message.data.type) {
      case "BLOCK": // user was hacked => log out 
        block().then(val => resolve(val));
        break;
      case "RECEIVE_TRANSACTION":

        break;
      default:
        break;
    }
  });
})

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
    }).then(data => console.log(JSON.stringify(data)));
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
  if(nextAppState == "background") {
    offline();
    BackgroundTimer.runBackgroundTimer(() => { 
      console.log("background")
  },2000);
  } else if(nextAppState =="active") {      
    online();
    BackgroundTimer.stopBackgroundTimer();  
  }
}

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
  messageListener,
  onTokenRefreshListener
};