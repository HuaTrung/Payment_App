//import * as firebase from 'firebase';

const GLOBAL = {
  HostName: "http://192.168.1.9:8080" // config host  here [aws, heroku, localhost(use Ipv4) , ...]

};
// const firebaseConfig = {
//   apiKey: "AIzaSyC6yozzmREqGVzutPzPp9fXgEC_FOZGjdc",
//   authDomain: "online-payment-ac4b8.firebaseapp.com",
//   databaseURL: "https://online-payment-ac4b8.firebaseio.com",
//   storageBucket: "online-payment-ac4b8.appspot.com",
// };
// let instance = null
// class FirebaseService {
  
//   constructor() {
//     if (!instance) {
//       this.app = firebase.initializeApp(firebaseConfig);
//       instance = this;
//     }
//     return instance
//   }
// }
 
// const firebaseService = new FirebaseService().app
// export default firebaseService;
// export const database = firebaseService.database();
// export const auth = firebaseService.auth();
// export const storage = firebaseService.storage();
export default GLOBAL;