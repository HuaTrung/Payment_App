const express = require('the_root/node_modules/express');
const router = express.Router();

const accountRoute = require('./src/routes');
const resterRoute = require('./src/routes/test');

router.use('/account',accountRoute);
router.use('/test',resterRoute);

module.exports = router;