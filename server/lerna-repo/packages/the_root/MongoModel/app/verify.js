const mongoose = require('mongoose');

const VerifySchema = new mongoose.Schema({
    phone: String,
    request_id : String,
    expired: Date
},{collection: 'verify'});
	
const User =  mongoose.model('verify',VerifySchema);

module.exports = User;