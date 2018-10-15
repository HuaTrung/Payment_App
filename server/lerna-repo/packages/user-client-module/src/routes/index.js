const express = require('the_root/node_modules/express');
const loginController = require('../controllers/login.controller');
const registerController = require('../controllers/register.controller');
const verifyRegisterController = require('../controllers/verify-register.controller');
const router = express.Router();

router.post('/login', (req,res) => {  
  console.log('user start login');
  loginController(req, res)
});

router.post('/register', (req,res) => {  
  registerController(req, res)
});

// post later
router.post('/verify-register', (req,res) => {  
  verifyRegisterController.verifyCodeController(req, res)
});

router.post('/verify-register-confirm', (req,res) => {  
  verifyRegisterController.confirmVerifyCodeController(req, res)
});

router.post('/resend-verify', (req,res) => {
  verifyRegisterController.resendVerificationRequest(req,res);
});


// Config express route in ver 4.x
module.exports = router;