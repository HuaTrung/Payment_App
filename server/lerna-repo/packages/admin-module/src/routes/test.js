const express = require('express');
const router = express.Router();

const Account = require('database-module/models/admin/Account');
const bcrypt = require('bcryptjs');


router.get("/rester", (req,res) => {
    
    
    const newAccount = new Account();

    newAccount.firstName = "Shinigami";
    newAccount.lastName = "lalala";
    newAccount.email = "tienlx97@gmail.com";
    newAccount.defaultPassword = "123456789";
    newAccount.password = "123";

    newAccount.save().then(acc => res.json(acc)).catch(err => console.log(err));


    // bcrypt.genSalt(10, (err,salt) => {
    //     bcrypt.hash(_Account.password, salt, (err, hash) => {
    //         if(err) throw err;
    //         _Account.password = hash;
    //     });
    // });

});



// Config express route in ver 4.x
module.exports = router;