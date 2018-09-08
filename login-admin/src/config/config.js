
// Setting local port and HEROKU port
const port = process.env.PORT || 3000;
const EMAIL_SECRET = 'eSecret';
const LOGIN_SECRET = 'lSecret';
const MAIL_EXPIRE = 60*5;
const LOGIN_EXPIRE = 60*60;



module.exports.port = port;
module.exports.EMAIL_SECRET = EMAIL_SECRET;
module.exports.MAIL_EXPIRE = MAIL_EXPIRE;
module.exports.LOGIN_SECRET = LOGIN_SECRET;
module.exports.LOGIN_EXPIRE = LOGIN_EXPIRE;