import Schema,{ USER_SCHEMA,SETTING_SCHEMA, databaseOptions } from "./schema";
import Realm from "realm";
import logout from "../no-redux/logout";
import isEmpty from "../validations/is-empty.validate";
import  store  from "../redux/store";
import { CHANGE_LANGUAGE } from "../redux/actions/types";
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

export const insertDefaultSetting = () => new Promise((resolve,reject) => {  
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      try {
        realm.create(SETTING_SCHEMA, { language: 1 }, true);
        store.dispatch({
          type: CHANGE_LANGUAGE,
          payload: 1
        });
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

export const updateSecurityPass = (sPass) => new Promise((resolve,reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
    // realm.create(USER_SCHEMA, {id, isFirstTime: false}, true);
    let user = realm.objectForPrimaryKey(USER_SCHEMA,Schema.objects(USER_SCHEMA)[0].id);
      user.securityPass = sPass;
      //alert(JSON.stringify(user));
      resolve();
   })
  }).catch((err) => reject(err));
});

export const updateLanguage = (sLang) => new Promise((resolve,reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
    // realm.create(USER_SCHEMA, {id, isFirstTime: false}, true);
      let setting = Schema.objects(SETTING_SCHEMA)[0];
      setting.language = sLang;
      resolve();
   })
  }).catch((err) => reject(err));
});

export const updateMoney = (money) => new Promise((resolve,reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
    // realm.create(USER_SCHEMA, {id, isFirstTime: false}, true);
    let user = realm.objectForPrimaryKey(USER_SCHEMA,Schema.objects(USER_SCHEMA)[0].id);
      user.money=parseFloat(money),
      // alert(JSON.stringify(user));
      resolve(user.money);
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

// setting
export const querySettingId = () =>  Schema.objects(SETTING_SCHEMA)[0];
export const querySettingLanguage = () =>  Schema.objects(SETTING_SCHEMA)[0].language;
export const isEmptySetting = () =>  Schema.objects(SETTING_SCHEMA).length == 0;

// user
export const isEmptyUserLogin = () =>  Schema.objects(USER_SCHEMA).length == 0;
export const isFirstTimeUsing = () =>  Schema.objects(USER_SCHEMA)[0].isFirstTime;
export const queryUserId = () =>  Schema.objects(USER_SCHEMA)[0].id;
export const queryUserPhone = () =>  Schema.objects(USER_SCHEMA)[0].phone;
export const queryUserOnline = () =>  Schema.objects(USER_SCHEMA)[0].online;
export const queryUser = () =>  Schema.objects(USER_SCHEMA)[0];
export const queryUserName = () =>  Schema.objects(USER_SCHEMA)[0].name;
export const queryUserTypeMoney = () =>  Schema.objects(USER_SCHEMA)[0].typeMoney;
export const queryUserMoney = () =>  Schema.objects(USER_SCHEMA)[0].money;
export const queryUserAvatar = () =>  Schema.objects(USER_SCHEMA)[0].avatar;