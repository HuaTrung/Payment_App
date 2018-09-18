const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    firstName: { 
        type : String,
        require: true 
    },
    lastName: { 
        type : String,
        require: true 
    },
    email: {
        type: String,
        require: true
    },
    defaultPassword: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('accounts',AccountSchema);