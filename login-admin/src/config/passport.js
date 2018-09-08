const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const Account = require('../models/Account');
const keys  = require('../config/config');

/**
 * @description ops is an object containing options how the token is extracted from the request or verify
 * @param secretOrKey the token's signature
 * @param jwtFromRequest way to extract jwt token
 */
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.LOGIN_SECRET;

/**
 * @description read jwt token form the http Authorization header with 'bearer'
 */
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload,done) => {
        Account.findById( jwt_payload.id )
            .then(acc => {
                if(acc) return done(null,acc);
                return done(null,false);
            })
    }));
};