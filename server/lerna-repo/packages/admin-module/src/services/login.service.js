const mongoose = require('mongoose');

const Account = require('../../../server-module/MongoModel/account');

/**
 * @description find email in database
 * @param email 
 */
FindAccountByEmail = email => {
    Account.findOne({email}).then(account => {
        return account;
    });
}

module.exports = {
    FindAccountByEmail
}