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
const compression = require('compression');

 // LOCAL IMPORT
 const config = require('./config/config');
 const mongoURL = require('./config/database.config').mongoURL;
 const routes = require("./app");


 // IMPORT PACKAGES
 const passportConfig = require('admin-module/src/configs/passport.config');


 // Database config
mongoose
.connect(mongoURL,  { useNewUrlParser: true })
.then( () => console.log('MongoDB connected successfully') )
.catch( err => console.log(err) );


// Init express
const app = express();

// It's header
// we should remove it because it will tell the client know what's the framework you are using
app.disable('x-powered-by');

// Use gzip compression
// Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app
// Use the compression middleware for gzip compression in your express app
app.use(compression());

// cors
app.use(cors()); 

// Passport config
app.use(passport.initialize());
passportConfig(passport);


// Way to format data JSON - XML - URL - FORM DATA
// Body parser return a function activate like middleware . Listen data form client and get from request.body
// To get data from Form we need bodyParser
// @param extended : false => value can be string or array
// @param extended : true => value can be any type
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route splitting
routes(app);


app.listen(config.PORT , ()=> console.log('Server running on port: ' + config.PORT ));