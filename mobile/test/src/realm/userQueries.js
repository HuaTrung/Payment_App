import Schema,{ USER_SCHEMA, databaseOptions } from "./schema";
import Realm from "realm";
import axios from "axios";
import GLOBAL from "../config";
import isEmpty from "../validations/is-empty.validate";

export const insertUserLogin = newUserLogin => new Promise((resolve,reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      try {
        realm.create(USER_SCHEMA, newUserLogin, true);
        resolve();
      } catch (error) { throw error }
    });
  }).catch((err) => reject(err));
});

export const queryUserLoginData = () => new Promise((resolve,reject) => {
  Realm.open(databaseOptions).then(realm => {
    let currentUser = realm.objects(USER_SCHEMA)[0]; // get first user
    resolve(currentUser);
  }).catch((err) => reject(err));
});

export const updateIsFirstTime = (id) => new Promise((resolve,reject) => {
  // alert(1);
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
    // realm.create(USER_SCHEMA, {id, isFirstTime: false}, true);
      let user = realm.objectForPrimaryKey(USER_SCHEMA,id);
    
      user.isFirstTime = false;
      // alert(JSON.stringify(user));
      resolve();
   })
  }).catch((err) => reject(err));
});

export const deleteUserLogout = () => new Promise((resolve,reject)=> {
  console.log(1);
  let id = queryUserId();
  console.log(2);
  axios.post(GLOBAL.HostName + "/app/user/logout",{id})
  .then( response => {
    let { data } = response;
    console.log(3);
    if(data.status == 0) {
      Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
          try {
            realm.deleteAll();
            resolve(); 
          } catch (error) { }     
        });
      }).catch((err) => reject(err));
    }
  }).catch( err => console.warn(err));
  console.log(4);
});

export const isEmptyUserLogin = () =>  Schema.objects(USER_SCHEMA).length == 0;

export const isFirstTimeUsing = () =>  Schema.objects(USER_SCHEMA)[0].isFirstTime;

export const queryUserId = () =>  Schema.objects(USER_SCHEMA)[0].id;

export const queryUser = () =>  Schema.objects(USER_SCHEMA)[0];

export const queryUserMoney = () =>  Schema.objects(USER_SCHEMA)[0].money;

export const queryUserAvatar = () =>  Schema.objects(USER_SCHEMA)[0].avatar;