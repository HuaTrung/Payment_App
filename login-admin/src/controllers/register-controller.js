const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const Account = require('../models/Account');
/**
 * @description Register account
 * 1. Check email
 * 2. Validate data [ avatar, name, phone, gender, age, role ] => true
 * 3. Generate default pass
 * 3. Send email
 */
const registerRoute = (req, res ) => {
    // Check email existed in database or not
    Account.findOne({ email: req.body.email })
    .then( acc => {
        
        // if account has already existed in database
        // Just log 
        if(acc) return res.status(400).json({ email: 'email already exists' });

        // Get avatar from email
        // create image size: 200
        const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d:'mm' });

        // Generate default password:
        var password =  Math.random().toString(36).slice(-8);
    
        const name = req.body.name;
        const age = req.body.age;
        const phone = req.body.phone;
        const email = req.body.email;

        // Create new account:
        const newAccount = new Account({  name ,  email,  phone, age, avatar, password });

        // crypt password
        bcrypt.genSalt(10,(err,salt) => {
            bcrypt.hash(password, salt, (err,hash)=>{
                
                if(err) console.log(err);

                newAccount.password = hash;

                 // Save account into database
                newAccount.save() 
                    .then( account => res.json(account) ) 
                    .catch( account => console.log(err) );

            })
        });

        

       

    });
};

module.exports.RegisterRoute = registerRoute;