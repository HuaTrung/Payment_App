import Schema,{ USER_SCHEMA, databaseOptions } from "./schema";
import Realm from "realm";
import logout from "../no-redux/logout";
import isEmpty from "../validations/is-empty.validate";

export const insertUserLogin = newUserLogin => new Promise((resolve,reject) => {  
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      try {
        realm.create(USER_SCHEMA, newUserLogin, true);
        alert(JSON.stringify(queryUser()));
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

export const updateUserOnline = (id, data) => new Promise((resolve,reject) => {
  // alert(1);
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
    // realm.create(USER_SCHEMA, {id, isFirstTime: false}, true);
      let user = realm.objectForPrimaryKey(USER_SCHEMA,id);
    
      user.online = data;
      //console.log(JSON.stringify(queryUser()));
      // alert(JSON.stringify(user));
      resolve();
   })
  }).catch((err) => reject(err));
});

export const deleteUserLogout = () => new Promise((resolve,reject)=> {
  logout().then( () => {
    Realm.open(databaseOptions).then(realm => {
      realm.write(() => {
        try {
          realm.deleteAll();
          resolve(); 
        } catch (error) { }     
      });
    }).catch((err) => reject(err));
  });
});

export const isEmptyUserLogin = () =>  Schema.objects(USER_SCHEMA).length == 0;

export const isFirstTimeUsing = () =>  Schema.objects(USER_SCHEMA)[0].isFirstTime;

export const queryUserId = () =>  Schema.objects(USER_SCHEMA)[0].id;

export const queryUserPhone = () =>  Schema.objects(USER_SCHEMA)[0].phone;
export const queryUserOnline = () =>  Schema.objects(USER_SCHEMA)[0].online;
export const queryUser = () =>  Schema.objects(USER_SCHEMA)[0];

export const queryUserMoney = () =>  Schema.objects(USER_SCHEMA)[0].money;

export const queryUserAvatar = () =>  Schema.objects(USER_SCHEMA)[0].avatar;