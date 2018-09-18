const express = require('express');
const router = express.Router();


const Account = require('database-module/models/admin/account');
const bcrypt = require('bcryptjs');
router.get("/rester", (req,res) => {
    
    const _Account = new Account({
        firstName: "Shinigami",
        lastName: "lalala",
        email:"tienlx97@gmail.com",
        defaultPassword: "123456789",
        password: "123456789"
    });


  //  res.json(_Account);


    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(_Account.password, salt, (err, hash) => {
            if(err) throw err;
            _Account.password = hash;
            _Account.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
    });

});



// Config express route in ver 4.x
module.exports = router;