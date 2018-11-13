import Realm from "realm";

const USER_SCHEMA = "user";
const UserSchema = {
  name: USER_SCHEMA,
  primaryKey: "id",
  properties: {
    id : "string",
    name: "string",
    phone: "int",
    money: "double",
    gender: "bool", // true: male - false: female
    memberAt: "string",
    address: "string?",
    email: "string?",
    birthday: "string?",
  }
}

const databaseOptions = {
  path: "OPApp.realm",
  schema: [UserSchema],
  schemaVersion: 0
}

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

export const checkUserExist = (callback) => {
  
};

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

export default new Realm(databaseOptions);