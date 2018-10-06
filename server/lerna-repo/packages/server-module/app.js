
const accountRoute = require('admin-module');
const transactionRoute=require('transaction-module');
module.exports = function(app) {
    app.use('/secure',accountRoute);
}

module.exports = function(app) {
    app.use('/transaction',transactionRoute);
}