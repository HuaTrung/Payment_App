//
// Code will go first
//

// Require module:
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// Require custom module:
const config = require('./src/config/config');
const databaseConfig = require('./src/config/database-config');
const registerController  = require('./src/controllers/register-controller');
const homeController = require('./src/controllers/home-controller');
// Init
const app = express();

/* BodyParser for middleware */
// To handle HTTP POST request in express.js ver 4, we need body parser
// body-parser extract the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Config passport middle */
app.use(passport.initialize());

// Passport config
require('./src/config/passport')(passport);

/* CONNECT TO MONGO DATABASE */
databaseConfig.ConnectDatabase(mongoose);

/* ROUTES */
app.post('/sign-in',(req,res) => registerController.LoginRoute(req,res));
app.get('/', (req,res) => homeController.HomeRoute(req,res));
app.post('/register',(req,res) => registerController.RegisterRoute(req,res));
app.post('/changePassword',(req,res) => registerController.ChangePasswordRoute(req,res));
app.get('/verify/:token',(req,res) => registerController.VerifyRoute(req,res));
/**
 * @description Get the route if we signed in by check jwt token
 */
app.get('/current' , passport.authenticate('jwt', { session: false }), (req,res)=> {
    res.json(req.user);
});
// Listen port for connection
app.listen(config.port, () => console.log('Server running on port: ' + config.port));