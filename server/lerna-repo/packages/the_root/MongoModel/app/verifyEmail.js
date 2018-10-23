const mongoose = require('mongoose');

const VerifySchema = new mongoose.Schema({
    email: String,
    code: Number
},{collection: 'verifyEmail'});
	
const User =  mongoose.model('verifyEmail',VerifySchema);

module.exports = User;