const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginValidate = require('../validations/login.validate');
const loginService = require('../services/login.service');
const errorsName = require('../validations/errors-name');
const envConfig = require('../configs/env.config');

// database-module
const Account = require('../../../server-module/MongoModel/account');


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
    if(!isValid) return res.status(400).json(errors);
    
    // If not error we will get email and password from client
    const email = req.body.email;
    const password = req.body.password;

    // Check email existed in database or not
    // If not existed we will get the information of account like email - id - name
    Account.findOne({email}).then( account => {       

        // Cannot find account in database => send error to client
        // Client will get the error and show to client know
        if(!account) {
            errors.email = errorsName.ACCOUNT_INVALID;
            return res.status(404).json(errors);        
        }

        // If we can find account        
        // Compare password by using bcryptjs 
        // You can use SHA512 - Bcrypt - AES256 to secure password
        // https://kipalog.com/posts/Bam-va-luu-password-dung-cach
        bcrypt.compare(password,account.password)
        .then( isMatch => { 
            if(isMatch) {
                // create jwt payload
                // every time you come to secure url
                // we'll check the jwt payload
                const payload = {             
                    id: account.id,
                    name: account.lastName
                }

                // Sign token to the browser
                /** @param { Objetct } payload - JWT data you want to send to client
                 *  @param { String } secretOrPrivateKey - something like password */
                jwt.sign(
                    payload, // data
                    envConfig.PAYLOAD_KEY, // pass to extract
                    { expiresIn: envConfig.TOKEN_EXPIRE }, // day exist
                    ( err, token ) => { // encode to token

                        // when we get the data in database
                        // Send it to client
                        // Using Bearer token
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } 
            // If compare password fail that mean
            // wrong password => send to client know
            else { 
                errors.password = errorsName.PASSWORD_INCORRECT;
                return res.status(400).json(errors);
            }
        });
    });
}