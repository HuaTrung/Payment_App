const express = require('the_root/node_modules/express');
const router = express.Router();

//const transaction = require('transaction_module');
const Transaction = require('the_root/MongoModel/transaction');
router.post("/", (req, res) => {
    var { Name, Target, Money, Description } = req.body;
    if (Name == undefined || Target == undefined || Money == undefined || Description == undefined)
        res.send("Something wrong:\n"
            + ((Name == undefined) ? "Name: undefined" : ("Name: " + Name)) + "\n"
            + ((Target == undefined) ? "Target: undefined" : ("Target: " + Target)) + "\n"
            + ((Money == undefined) ? "Money: undefined" : ("Money: " + Money)) + "\n"
            + ((Description == undefined) ? "Description: undefined" : ("Description: " + Description)) + "\n"
            //+((DateGet==undefined)?"DateGet: undefined":("DateGet: "+DateGet))+"\n"
        );
    else {
        const newTransaction = new Transaction({
            Name: Name,
            Target: Target,
            Money: Money,
            Description: Description,
            DateGet: new Date(),
            UrlFull: JSON.stringify(req.body)
        });
        newTransaction.save().then(item =>
            res.json(JSON.stringify(req.body))
        ).catch(err => {
            console.log(err);
        });
    }
});
router.get("/listUserToUser", (req, res) => {
    Transaction.find({}, function(err, users) {
        res.json(users); 
    });
});

// Config express route in ver 4.x
module.exports = router;