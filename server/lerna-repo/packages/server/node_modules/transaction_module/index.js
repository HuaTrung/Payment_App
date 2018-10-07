const express = require('the_root/node_modules/express');
const router = express.Router();

const usertouserRoute = require('./src/routes/usertouser');

router.use('/usertouser',usertouserRoute);

module.exports = router;