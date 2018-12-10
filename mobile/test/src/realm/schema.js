import Realm from "realm";

const USER_SCHEMA = "user";
const UserSchema = {
  name: USER_SCHEMA,
  primaryKey: 'id',
  properties: {
    id : "string",
    name: "string",
    phone: "string",
    money: "double",
    gender: "bool", // true: male - false: female
    isFirstTime: "bool",
    memberAt: "double",
    address: "string?",
    email: "string?",
    birthday: "double?",
    avatar:"string",
    typeMoney:"string",
    online:"bool?"
  }
}

const databaseOptions = {
  path: "OPApp.realm",
  schema: [UserSchema],
  schemaVersion: 1
}

export {
  USER_SCHEMA,
  databaseOptions
}
export default new Realm(databaseOptions);