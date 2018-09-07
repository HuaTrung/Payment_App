const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AccountSchema = new Schema({
    name: { type: String, require: true },    
    email: { type: String, require: true },
    phone: { type: String, require: true },
    age: { type: String, require: true },
    avatar: { type: String },
    password: { type: String, require: true },

    // email verity
    // secretToken: { type: String},
    activate: { type: Boolean, default: false },     

    role: { type: String, default: true },
    date: { type: Date, default: Date.now },
    gender: { type: Boolean, default: true }
    
});
const account = mongoose.model('accounts',AccountSchema);
module.exports = account;


