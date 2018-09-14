const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login.controller');


router.get('/login', (req,res) =>  loginController(req, res));

// Config express route in ver 4.x
module.exports = router;