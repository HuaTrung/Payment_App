
// Setting local port and HEROKU port
const port = process.env.PORT || 3000;
const EMAIL_SECRET = 'secrdfe';

const MAIL_EXPIRE = 60*5;




module.exports.port = port;
module.exports.EMAIL_SECRET = EMAIL_SECRET;
module.exports.MAIL_EXPIRE = MAIL_EXPIRE;