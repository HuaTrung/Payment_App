const Transaction = require('the_root/MongoModel/transaction');

/**
 * @description find email in database
 * @param email 
 */
FindAllUserToUser = () => {
    Transaction.find({}, function(err, users) {
        var User = {};
    
        users.forEach(function(user) {
            User[user._id] = user;
        });
    
        res.send(userMap); 
    });
}

module.exports = {
    FindAllUserToUser
}