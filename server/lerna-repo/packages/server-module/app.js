
const accountRoute = require('admin-module');

module.exports = function(app) {
    app.use('/secure',accountRoute);
}