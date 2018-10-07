const express = require('the_root/node_modules/express');
const router = express.Router();

//const transaction = require('transaction_module');
const Transaction = require('the_root/MongoModel/transaction');
const Account = require('the_root/MongoModel/account');
const bcrypt = require('the_root/node_modules/bcryptjs');
router.post("/", (req, res) => {
    var { Name, Target, Money, Description } = req.body;
    if ( Name == undefined || Target == undefined || Money == undefined || Description == undefined)
        res.send("Something wrong:\n"
            + ((Name == undefined) ? "Name: undefined" : ("Name: " + Name)) + "\n"
            + ((Target == undefined) ? "Target: undefined" : ("Target: " + Target)) + "\n"
            + ((Money == undefined) ? "Money: undefined" : ("Money: " + Money)) + "\n"
            + ((Description == undefined) ? "Description: undefined" : ("Description: " + Description)) + "\n"
            //+((DateGet==undefined)?"DateGet: undefined":("DateGet: "+DateGet))+"\n"
        );
    else {
        const newTransaction = new Transaction({
            Name: Name,
            Target: Target,
            Money: Money,
            Description: Description,
            DateGet: new Date()
        });
        newTransaction.save().then(item => 
            res.json("item saved to database")
        ).catch(err => {
            console.log(err);
        });
    }
  //   const newAccount  = new Account({
	// 	firstName: "Le Xuan Tien 100",
	// 	lastName: "lalala",
	// 	email: "tienlx97@gmail.com",
	// 	password: "123456789"
	// });

	// bcrypt.genSalt(10, (err, salt) => {
	// 	bcrypt.hash(newAccount.password, salt, (err, hash)=> {
	// 		newAccount.password = hash;
	// 		newAccount.save()
	// 		.then(acc => res.json(acc))
	// 		.catch(err => console.log(err));
	// 	});
    // });
});


// Config express route in ver 4.x
module.exports = router;