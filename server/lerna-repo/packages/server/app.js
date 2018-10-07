
const accountRoute = require('admin_module');
// const userClientRoute = require('user-client-module');
const transactionRoute=require('transaction_module');
module.exports = function(app) {
    app.use('/secure',accountRoute);
    // app.use('/app',userClientRoute);
    app.use('/transaction',transactionRoute);
}