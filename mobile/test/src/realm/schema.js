import Realm from "realm";

const USER_SCHEMA = "user";
const SETTING_SCHEMA = "setting";
const TRAN_HISTORY_SCHEMA = "tranhistory";
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

const TranHistorySchema = {
  name: TRAN_HISTORY_SCHEMA,
  properties: {
    DateTrans: "string",
    Description: "string",
    FeeTrans: "double",
    Money: "double",
    Name: "string",
    Phone: "string",
    Target: "string",
    TranID: "string",
    Type: "int"
  }
};

const databaseOptions = {
  path: "OPApp.realm",
  schema: [UserSchema,SettingSchema,TranHistorySchema],
  schemaVersion: 1
}

export {
  USER_SCHEMA,
  SETTING_SCHEMA,
  TRAN_HISTORY_SCHEMA,
  databaseOptions,
  
}
export default new Realm(databaseOptions);