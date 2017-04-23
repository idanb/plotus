var express = require('express');
var router = express.Router();
var User = require('../models/UserModel');
var Transaction = require('../models/TransactionModel');

/* /transactions/:status/:userId

 /* GET All users listing. */
router.get('/', function(req, res, next) {
    User.getAll().then(function (rows) {
        res.json(rows);
    });
});

/* GET User data by User id. */
router.get('/:userId', function(req, res, next) {
    User.getByUser(req.params.userId).then(function (rows) {
        res.json(rows);
    });
});

// route to authenticate a user (POST http://localhost:8080/users/authenticate)
router.post('/authenticate', function(req, res) {
    User.authenticateUser(req.body.email, req.body.password).then(function (user) {
        //if (err) throw err;
        if (!user[0]) {
            res.json({ success: false, message: 'Authentication failed. User not found or wrong password.' });
        } else if (user) {
            // check if password matches
            if (user[0].password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token
                // return the information including token as JSON and check whether the user made any conversions
                var token = user[0].password + "|" + user[0].email_address;
                Transaction.getByUser(0, user[0].id).then(function (transactions) {
                    res.json({
                        success: true,
                        message: 'Authentication success',
                        token: token,
                        user: user[0],
                        transactions: transactions
                    });
                });
            }
        }
    });
});

module.exports = router;