import * as firebase from 'firebase';

const GLOBAL = {
  HostName: "http://192.168.1.2:8080" // config host  here [aws, heroku, localhost(use Ipv4) , ...]

};
const firebaseConfig = {
  apiKey: "AIzaSyC6yozzmREqGVzutPzPp9fXgEC_FOZGjdc",
  authDomain: "online-payment-ac4b8.firebaseapp.com",
  databaseURL: "https://online-payment-ac4b8.firebaseio.com",
  storageBucket: "online-payment-ac4b8.appspot.com",
};

firebase.initializeApp(config);
export const database = firebase.database();
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();
export default {GLOBAL};