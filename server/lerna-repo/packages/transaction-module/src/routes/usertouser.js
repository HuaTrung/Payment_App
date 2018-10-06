const express = require('express');
const router = express.Router();

//const transaction = require('transaction-module');
const Transaction = require('../../../server-module/MongoModel/transaction');
const Account = require('../../../server-module/MongoModel/account');
const bcrypt = require('bcryptjs');
router.get("/", (req, res) => {
    // var { ID, Name, Target, Money, Description } = req.body;
    // if (ID == undefined || Name == undefined || Target == undefined || Money == undefined || Description == undefined)
    //     res.send("Something wrong:\n" + ((ID == undefined) ? "ID: undefined" : ("ID: " + ID)) + "\n"
    //         + ((Name == undefined) ? "Name: undefined" : ("Name: " + Name)) + "\n"
    //         + ((Target == undefined) ? "Target: undefined" : ("Target: " + Target)) + "\n"
    //         + ((Money == undefined) ? "Money: undefined" : ("Money: " + Money)) + "\n"
    //         + ((Description == undefined) ? "Description: undefined" : ("Description: " + Description)) + "\n"
    //         //+((DateGet==undefined)?"DateGet: undefined":("DateGet: "+DateGet))+"\n"
    //     );
    // else {
    //     const newTransaction = new Transaction({
    //         ID: ID,
    //         Name: Name,
    //         Target: Target,
    //         Money: Money,
    //         Description: Description,
    //         DateGet: "123"
    //     });
    //     newTransaction.save().then(item => {
    //         res.send("item saved to database");
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }
    const newAccount  = new Account({
		firstName: "Le Xuan Tien 100",
		lastName: "lalala",
		email: "tienlx97@gmail.com",
		password: "123456789"
	});

	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newAccount.password, salt, (err, hash)=> {
			newAccount.password = hash;
			newAccount.save()
			.then(acc => res.json(acc))
			.catch(err => console.log(err));
		});
	});
});


// Config express route in ver 4.x
module.exports = router;