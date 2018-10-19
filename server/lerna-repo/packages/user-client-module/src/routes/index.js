const express = require('the_root/node_modules/express');
const loginController = require('../controllers/login.controller');
const registerController = require('../controllers/register.controller');
const verifyRegisterController = require('../controllers/verify-register.controller');
const forgotPassController = require('../controllers/forgot-password.controller');
const router = express.Router();

router.post('/login', (req,res) => {  
  console.log('user start login');
  loginController(req, res)
});

router.post('/register', (req,res) => {  
  registerController(req, res)
});

router.post('/send-verify', (req,res) => {  
  verifyRegisterController.verifyCodeController(req, res)
});

router.post('/forgot-password', (req,res) => {
  forgotPassController(req,res);
});

// Config express route in ver 4.x
module.exports = router;