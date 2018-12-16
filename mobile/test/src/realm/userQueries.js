import Schema,{ USER_SCHEMA,SETTING_SCHEMA, TRAN_HISTORY_SCHEMA, databaseOptions } from "./schema";
import Realm from "realm";
import logout from "../no-redux/logout";
import isEmpty from "../validations/is-empty.validate";
import  store  from "../redux/store";
import { CHANGE_LANGUAGE } from "../redux/actions/types";


// setting
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

export const querySettingId = () =>  Schema.objects(SETTING_SCHEMA)[0];
export const querySettingLanguage = () =>  Schema.objects(SETTING_SCHEMA)[0].language;
export const isEmptySetting = () =>  Schema.objects(SETTING_SCHEMA).length == 0;

// transaction history

export const updateTransHis = (data) => new Promise((resolve,reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      for(let i = 0; i<data.length ; i++) {
       // console.log(data[i]);
        realm.create(TRAN_HISTORY_SCHEMA, 
          {     
            DateTrans: data[i].DateTrans,
            Description: data[i].Description,
            FeeTrans: data[i].FeeTrans,
            Money: data[i].Money,
            Name: data[i].Name,
            Phone: data[i].Phone,
            Target: data[i].Target,
            TranID: data[i].TranID,
            Type: data[i].Type
          }, true);
      }
      resolve();
   })
  }).catch((err) => reject(err));
});

export const deleteTransHis = () => new Promise((resolve,reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      let transHis = Schema.objects(TRAN_HISTORY_SCHEMA);
      realm.delete(transHis);      
      resolve();
   })
  }).catch((err) => reject(err));
});

export const queryTransData = () => new Promise((resolve,reject)  => {
  let count = Schema.objects(TRAN_HISTORY_SCHEMA).length;
  let data = [];
  for(let i=0; i< count; i++) {
    data.push(queryTransHisId(i));
  }
  resolve(data);
})

export const queryTempData = () => new Promise((resolve,reject)  => {
  let count = Schema.objects(TRAN_HISTORY_SCHEMA).length;
  let data = [];
  for(let i=0; i< count; i++) {
    let Name = queryTransHisIdName(i); 
    let Money = queryTransHisIdMoney(i);
    let DateTrans =  queryTransHisIdDateTrans(i);
    let Type =  queryTransHisIdType(i);
    data.push({Type, DateTrans, Money, Name});
    // console.log(data);
  }
  resolve(data);
})

export const queryTransHisId = (i) =>  Schema.objects(TRAN_HISTORY_SCHEMA)[i];
export const queryTransHisIdName = (i) =>  Schema.objects(TRAN_HISTORY_SCHEMA)[i].Name;
export const queryTransHisIdMoney = (i) =>  Schema.objects(TRAN_HISTORY_SCHEMA)[i].Money;
export const queryTransHisIdDateTrans = (i) =>  Schema.objects(TRAN_HISTORY_SCHEMA)[i].DateTrans;
export const queryTransHisIdType = (i) =>  Schema.objects(TRAN_HISTORY_SCHEMA)[i].Type;
export const queryTransHis = () =>  Schema.objects(TRAN_HISTORY_SCHEMA);
export const isEmptyTransHis = () =>  Schema.objects(TRAN_HISTORY_SCHEMA).length == 0;

// user
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
          let user = realm.objects(USER_SCHEMA);
          realm.delete(user);
          deleteTransHis().then( () => resolve() );
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
export const queryUserName = () =>  Schema.objects(USER_SCHEMA)[0].name;
export const queryUserTypeMoney = () =>  Schema.objects(USER_SCHEMA)[0].typeMoney;
export const queryUserMoney = () =>  Schema.objects(USER_SCHEMA)[0].money;
export const queryUserAvatar = () =>  Schema.objects(USER_SCHEMA)[0].avatar;
export const querySecurityPass = () =>  Schema.objects(USER_SCHEMA)[0].securityPass;