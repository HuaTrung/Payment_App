const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
		firstName: String,
		lastName : String,
		email: String,
		password: String
	});
	
const Account =  mongoose.model('accounts',AccountSchema);

module.exports = Account;