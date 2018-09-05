const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// Load user model
const User = require("../../models/User");

router.get("/test", (req,res) => res.json({
    msg: "users work"
}) );

router.post("/register", (req,res) => {
    User.findOne({ email: req.body.email}) // get email in mongoose
    .then( user => {
        if(user) {
            return res.status(400).json({ email: "email already exists" });
        } else {

            // just test avatar
            const avatar = gravatar.url(req.body.email, {
                s: "200", // size
                r: "pg", // rating
                d: "mm" // default
            });

            // create new user
            const newUser = new User({
                name: req.body.name,
                email:req.body.email,
                avatar, // es6
                password: req.body.password
            });

            // crypt password
            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(newUser.password, salt, (err , hash) => {
                    if(err) console.log(err);
                    newUser.password = hash;
                    newUser // push to mongoose
                        .save()
                        .then( user => res.json(user))
                        .catch( err => console.log(err));
                })
            });

        }
    });
});

// @router      login
// @desc        Login user , return jwt token
// @access      public
router.post("/login", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    User.findOne({ email /*es6*/ })
    .then( user => {
        
        // user not found
        if(!user) {
            return res.status(404).json({ email: "user not found" });
        } 
        else {
            // check password
            bcrypt
                .compare(password, user.password)
                .then( isMatch => {
                    if(isMatch) {
                        res.json({ msg: "success" });                     
                    } else {
                        return res.status(400).json({ password: "password incorrect" });
                    }
                });
        }
    })
});

module.exports = router;