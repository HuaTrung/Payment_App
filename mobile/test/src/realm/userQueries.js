import Schema,{ USER_SCHEMA, databaseOptions } from "./schema";
import Realm from "realm";

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

export const isEmptyUserLogin = () =>  Schema.objects(USER_SCHEMA).length == 0;

export const queryUSerMoney = () =>  Schema.objects(USER_SCHEMA);