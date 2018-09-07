//
// Code will go first
//

// Require module:
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

/* CONNECT TO MONGO DATABASE */
databaseConfig.ConnectDatabase(mongoose);

/* ROUTES */
app.get('/', (req,res) => homeController.HomeRoute(req,res));
app.post('/register',(req,res) => registerController.RegisterRoute(req,res));
app.get('/verify/:token',(req,res) => registerController.VerifyRoute(req,res));

// Listen port for connection
app.listen(config.port, () => console.log('Server running on port: ' + config.port));