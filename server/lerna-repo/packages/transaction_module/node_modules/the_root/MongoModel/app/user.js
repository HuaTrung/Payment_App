const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username:  {
    type: String,
    require: true  },
  email :  {
    type: String,
    require: true
  },
  countryCode: {
    type: String,
    require: true
  },
  phone: {
    type: Number,
    require: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  requestId: {
    type: String
  },
  password:  {
    type: String,
    require: true
  },
},{collection: 'user'});

const User =  mongoose.model('user',UserSchema);
module.exports = User;