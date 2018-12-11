import firebase from "react-native-firebase";
import type { Notification, NotificationOpen, RemoteMessage} from "react-native-firebase";
import { queryUserId } from "../realm/userQueries";
import { AppState, AsyncStorage } from "react-native";
import  BackgroundTimer  from "react-native-background-timer";
import { block } from "./logout";
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

const messageListener = () => new Promise((resolve,reject) => {
  AsyncStorage.getItem('LOGIN').then(value => {
    if(value == null) {
      AsyncStorage.setItem('LOGIN','1').then(()=> {
        firebase.messaging().onMessage((message: RemoteMessage) => {
          console.log(JSON.stringify(message))
          // Process your message as required
          switch (message.data.type) {
            case "BLOCK": // user was hacked => log out 
              block().then(val => resolve(val));
              break;
            case "RECEIVE_TRANSACTION":
      
              break;
          }
        });
      })
    }
  })
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