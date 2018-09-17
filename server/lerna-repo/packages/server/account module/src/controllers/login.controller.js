const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginValidate = require('../validations/login.validate');
const loginService = require('../services/login.service');
const errorsName = require('../validations/errors-name');
const envConfig = require('../configs/env.config');
const Account = require('../models/account');

/**
 * @description Login admin page
 * @param req: Request
 * @param res: Response
 * @param status: 404: wrong/ 400: can't handle request from client
 */
module.exports =  (req, res) => {
    // To sign in we need email and password not error
    const { errors, isValid } = loginValidate.ValidateLogin(req.body);
    // If we have errors
    // Send response to client
    if(!isValid) {
        return res.status(400).json(errors);
    }
 
    // get user form client
    const email = req.body.email;
    const password = req.body.password;
  
    // Check account in database
    // const account = loginService.FindAccountByEmail(email);
   
    Account.findOne({email: email}).then( account => {
        console.log(account);
        // Cannot find account in database => send error to client
        if(!account) {
            errors.email = errorsName.ACCOUNT_INVALID;
            return res.status(404).json(errors);        
        }

        // Compare password:
        bcrypt.compare(password,account.password)
        .then( isMatch => { 
            if(isMatch) {
                // create jwt payload
                // every time you come to secure url
                // we'll check the jwt payload
                const payload = {             
                    id: account.id,
                    name: account.name
                }

                // Sign token to the browser
                jwt.sign(
                    payload, // data
                    envConfig.PAYLOAD_KEY, // pass to extract
                    { expiresIn: envConfig.TOKEN_EXPIRE }, // day exist
                    ( err, token ) => { // encode to token
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                )
            } else { // wrong password => send to client know
                errors.password = errorsName.PASSWORD_INCORRECT;
                return res.status(400).json(errors);
            }
        });
    });
}