const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
        Name: String,
        Target: String,
        Money: String,
        Description: String,
        DateGet: String
	});
	
const Transaction =  mongoose.model('transaction',TransactionSchema);

module.exports = Transaction;