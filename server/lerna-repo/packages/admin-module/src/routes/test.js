const express = require('express');
const router = express.Router();
const Account = require('../../../server-module/MongoModel/account');
const bcrypt = require('bcryptjs');


router.get("/rester", (req,res) => {
	

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