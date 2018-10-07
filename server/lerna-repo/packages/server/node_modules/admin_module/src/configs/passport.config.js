const JwtStrategy = require('the_root/node_modules/passport-jwt').Strategy;
const ExtractJwt = require('the_root/node_modules/passport-jwt').ExtractJwt;

const Account  = require('the_root/MongoModel/account');
const envConfig = require('./env.config');

const opts = { };
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = envConfig.PAYLOAD_KEY;
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Account.findById(jwt_payload.id)
             .then(account => {
                if(account) return done(null, account);
                return done(null,false);
            })
             .catch(err => console.log(err));  
        })
    );
}