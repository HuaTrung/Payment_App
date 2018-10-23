const mongoose = require('mongoose');

const VerifySchema = new mongoose.Schema({
    phone: String,
    request_id : String,
    expired: Date
},{collection: 'verifyPhone'});
	
const User =  mongoose.model('verifyPhone',VerifySchema);

module.exports = User;