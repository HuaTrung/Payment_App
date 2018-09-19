// Express is a minimal and flexible Node.js web application framework 
// Provides a robust set of features for web and mobile applications.
const express = require('express');
// mongoDB for node js
const mongoose = require('mongoose');
// This is middleware to handle HTTP post request, json, text and encode url
const bodyParser = require('body-parser');
// Support authen in node js
const passport = require('passport');
const cors = require('cors');

/**
 * LOCAL IMPORT
 */
 const config = require('./config/config');


/**
 * IMPORT PACKAGES
 */
 const accountRoute = require('admin-module/src/routes/index');
 const testRoute = require('admin-module/src/routes/test'); // just test
 const passportConfig = require('admin-module/src/configs/passport.config');

 //const databaseConfig = require('database-module/database.config');
 const mongoURL = require('./config/database.config').mongoURL;
// Init express
const app = express();
app.use(cors()); // Use this after the variable declaration

/**
 * Database config
 */

mongoose
    .connect(mongoURL, {  useNewUrlParser: true })
    .then( () => console.log('MongoDB connected successfully') )
    .catch( err => console.log(err) );

/**
 * Passport config
 */
app.use(passport.initialize());
passportConfig(passport);


/**
 * Way to format data JSON - XML - URL - FORM DATA
 * Body parser return a function activate like middleware . Listen data form client and get from request.body
 * To get data from Form we need bodyParser
 * @param extended : false => value can be string or array
 * @param extended : true => value can be any type
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route splits
app.use('/secure',accountRoute);
app.use('/test',testRoute);

app.listen(config.PORT , ()=> console.log('Server running on port: ' + config.PORT ));