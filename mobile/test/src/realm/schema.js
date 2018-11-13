import Realm from "realm";

const USER_SCHEMA = "user";
const UserSchema = {
  name: USER_SCHEMA,
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

export {
  USER_SCHEMA,
  databaseOptions
}
export default new Realm(databaseOptions);