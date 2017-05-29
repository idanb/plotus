var express = require('express');
var router = express.Router();
var User = require('../models/UserModel');
var Transaction = require('../models/TransactionModel');
var transporter = require('../mailer.js');


/* /transactions/:status/:userId

 /* GET All users listing. */
router.get('/', function(req, res, next) {
    User.getAll().then(function (rows) {
        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});

/* GET User data by User id. */
router.get('/:userId', function(req, res, next) {
    User.getByUser(req.params.userId).then(function (rows) {
        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});

/* GET User data by User id. */
router.get('/debit-request/:userId', function(req, res, next) {
    User.validateDebit(req.params.userId).then(function (rows) {
        console.log("rows[0]['num']", rows[0]['num']);
        res.json({"is_valid": rows[0]['num'] >= 4 });
    }, function(reason) {
        res.json(reason);
    });
});

/* PUT User data by User id. */
router.put('/:userId', function(req, res, next) {
    var userId = req.body['id'];
    delete req.body['id'];
    req.body['cc_date'] = req.body['cc_date'].slice(0,7);
    User.updateUserByUserId(userId,req.body).then(function (rows) {
        console.log(rows);
        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });

});

/* GET init users balance */
router.get('/balance/initbalance/', function(req, res, next) {
    User.initBalance().then(function (rows,error) {
        res.json({initBalance: 'ok'});
    }, function(reason) {
        res.json(reason);
    });
});

/* GET User balance by User id. */
router.get('/balance/:userId', function(req, res, next) {
    User.getUserBalanceByUserId(req.params.userId).then(function (rows,error) {
        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});


/* PUT User balance by User id. */
router.put('/balance/:userId/:currencyId', function(req, res, next) {
    User.updateUserBalanceByUserId(req.params.userId,req.params.currencyId,req.body.value).then(function (rows,error) {
        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});

/* PUT User balance by User id. */ //withdrawMadeEmail
router.put('/withdraw/:userId/:currencyId', function(req, res, next) {
    User.updateUserBalanceByUserId(req.params.userId,req.params.currencyId,req.body.amount * -1).then(function (rows,error) {
        transporter.sendMail(transporter.withdrawMadeEmail(req.body.email_address,req.body.secret_code), function(error, info){
            if (error) {
                return console.log(error);
            }
            console.log('Email has been sent, id : %s , %s', info.messageId, info.response);
        });

        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});

/* PUT User balance by User id. */ //withdrawMadeEmail
router.put('/withdraw_debit/:userId/:currencyId', function(req, res, next) {
    User.updateUserBalanceByUserId(req.params.userId,req.params.currencyId,req.body.amount * -1).then(function (rows,error) {
        // transporter.sendMail(transporter.withdrawMadeEmail(req.body.email_address), function(error, info){
        //     if (error) {
        //         return console.log(error);
        //     }
        //     console.log('Email has been sent, id : %s , %s', info.messageId, info.response);
        // });

        res.json(rows);
    }, function(reason) {
        res.json(reason);
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
                }, function(reason) {
                    res.json(reason);
                });
            }
        }
        else{
            return user;
        }
    }, function(reason) {
        res.json(reason);
    });
});

module.exports = router;