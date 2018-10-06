
const accountRoute = require('admin-module');
const userClientRoute = require('user-client-module');
module.exports = function(app) {
    app.use('/secure',accountRoute);
    app.use('/app',userClientRoute);
}