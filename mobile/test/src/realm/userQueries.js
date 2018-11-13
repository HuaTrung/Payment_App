import Schema,{ USER_SCHEMA, databaseOptions } from "./schema";
import Realm from "realm";

import isEmpty from "../validations/is-empty.validate";


export const insertUserLogin = newUserLogin => new Promise((resolve,reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      try {
        realm.create(USER_SCHEMA,newUserLogin);
        resolve();
      } catch (error) { }
    });
  }).catch((err) => reject(err));
});

export const queryUserLoginData = () => new Promise((resolve,reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      try {
        let currentUser = realm.objects(USER_SCHEMA);
        resolve(currentUser);
      } catch (error) { }
    });
  }).catch((err) => reject(err));
});

export const deleteUserLogout = () => new Promise((resolve,reject)=> {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      try {
        realm.deleteAll();
        resolve(); 
      } catch (error) { }     
    });
  }).catch((err) => reject(err));
});

export const isEmptyUserLogin = () =>  isEmpty(Schema.objects(USER_SCHEMA));

export const queryUSerMoney = () =>  Schema.objects(USER_SCHEMA)[0];