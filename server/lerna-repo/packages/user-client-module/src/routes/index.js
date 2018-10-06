const express = require('express');
const userRegisterController = require('../controller/register.controller');
const verifyController = require('../controller/verify.controller');
const router = express.Router();
const nexmo = require('nexmo');


router.get('/verify-phone', (req,res) => {

  // nexmo config
  // nexmo is the library that help us to send SMS, call voice phone,...
  // const nexmoConfig = new nexmo({
  //   apiKey: 'ac6eeac2',
  //   apiSecret: '29nIW80lLaDZoWlT'
  // },{debug: true})
  // verifyController(req,res, nexmoConfig);
  
  verifyController(req,res);
});

router.post('/register', (req,res) => {
  userRegisterController(req,res);
});
module.exports = router;