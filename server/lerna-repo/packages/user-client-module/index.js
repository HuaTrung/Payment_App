const express = require('the_root/node_modules/express');
const router = express.Router();
const userClientRoute = require('./src/routes');

router.use('/user',userClientRoute);

module.exports = router;