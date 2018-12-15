import Realm from "realm";

const USER_SCHEMA = "user";
const SETTING_SCHEMA = "setting";
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
    securityPass: "string"
  }
}

const SettingSchema = {
  name: SETTING_SCHEMA,
  properties: {
    language: {
      type: "int",
      default: 0
    }
  }
};

const databaseOptions = {
  path: "OPApp.realm",
  schema: [UserSchema,SettingSchema],
  schemaVersion: 1
}

export {
  USER_SCHEMA,
  SETTING_SCHEMA,
  databaseOptions
}
export default new Realm(databaseOptions);