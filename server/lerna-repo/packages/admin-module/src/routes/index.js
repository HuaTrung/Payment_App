const express = require('express');

const loginController = require('../controllers/login.controller');


const router = express.Router();

router.post('/login', (req,res) => {  
    loginController(req, res)
});




// Config express route in ver 4.x
module.exports = router;