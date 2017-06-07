var express = require('express');
var router = express.Router();
var Transaction = require('../models/TransactionModel');
var User = require('../models/UserModel');
var transporter = require('../mailer.js');
var request = require('request');


/* /transactions/:status/:userId

 /* Init transactions. */
router.get('/initTransaction', function(req, res, next) {
    Transaction.initTransaction()
        .then(function (rows) {
            res.json({initTransaction: 'ok'});
        }, function(reason) {
            res.json(reason);
        });
});




//
// takes all transactions that status = 0 and end_date not null
// iterating for each one (N*N), if current_date > end_at - change status to 2 and inform user.
// between those who match the trade currency check which one is the best rate
// execute closeTransaction for the best match - update transactions and remove them from list. update users balance. update users by mail
// return report - transaction expired | transaction

/* GET explore and Match transactions . */
router.get('/explore-and-match', function(req, res, next) {
    Transaction.ExploreMatchTransactions()
        .then(function (transactions) {
            var total = transactions.length;
            var expired = 0;
            var matched = 0;
            var now = new Date();
            now.setHours(0,0,0,0);

            transactions.forEach(function(transaction,key){
                var transaction_date = new Date(transaction.end_at);
                if(transaction_date < now){
                    expired++;
                    transaction.status = 2;
                    Transaction.updateStatus(transaction.id, 2);
                    console.log('expired!',transaction.id);

                    User.getByUser(transaction.offer_user_id).then(function(user){
                        transporter.sendMail(transporter.expiredEmail(user[0]), function(error, info){
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Email has been sent, id : %s , %s', info.messageId, info.response);
                        });
                    });
                    return true;
                }

                transactions.slice(key+1,transactions.length).forEach(function(ttransaction){
                    console.log('transactions ids',transaction.id, ttransaction.id);
                    if(ttransaction.currency_offer_type != transaction.currency_requested_type
                        && ttransaction.currency_requested_type != ttransaction.currency_offer_type
                        || ttransaction.status == 1 || ttransaction.status == 2
                        || transaction.status == 1 || transaction.status == 2
                        || transaction.offer_user_id == ttransaction.offer_user_id) return true;
                        matched++;
                        matched++;
                        Transaction.closeTransaction(transaction.id, ttransaction.offer_user_id);
                        Transaction.closeTransaction(ttransaction.id, transaction.offer_user_id);

                        User.getByUser(ttransaction.offer_user_id).then(function(user){
                            transporter.sendMail(transporter.transactionMadeEmail(user[0],ttransaction), function(error, info){
                                if (error) {
                                    return console.log(error);
                                }
                                console.log('Email has been sent, id : %s , %s', info.messageId, info.response);
                            });
                        });

                        User.getByUser(transaction.offer_user_id).then(function(user){
                            transporter.sendMail(transporter.transactionMadeEmail(user[0],transaction), function(error, info){
                                if (error) {
                                    return console.log(error);
                                }
                                console.log('Email has been sent, id : %s , %s', info.messageId, info.response);
                            });
                        });

                        User.updateUserBalanceByUserId(transaction.offer_user_id,transaction.currency_offer_type,transaction.currency_offer_amount * -1);
                        User.updateUserBalanceByUserId(transaction.offer_user_id,transaction.currency_requested_type,transaction.currency_requested_amount);

                        User.updateUserBalanceByUserId(ttransaction.offer_user_id,ttransaction.currency_offer_type,ttransaction.currency_offer_amount * -1);
                        User.updateUserBalanceByUserId(ttransaction.offer_user_id,ttransaction.currency_requested_type,ttransaction.currency_requested_amount);

                        transaction.status = 1;
                        ttransaction.status = 1;

                        console.log('mached!','ttransaction.id',ttransaction.id);
                        console.log('mached!','transaction.id',transaction.id);
                });


               // console.log(value.offer_user_id);
            });

    res.json({total_transaction_on_wait: total,transactions_matched: matched, transactions_expired: expired});
    }, function(reason) {
        res.json(reason);
    });
});


/* GET All transactions listing. */
router.get('/', function(req, res, next) {
    Transaction.getAll().then(function (rows) {
        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});

/* GET any kind of transactions of all users. */
router.get('/:status', function(req, res, next) {
    Transaction.getbyStatus(req.params.status).then(function (rows) {
        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});

/* GET any kind of transactions by User. */
router.get('/:status/:userId', function(req, res, next) {
    Transaction.getByUser(req.params.status, req.params.userId).then(function (rows) {
        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});

/* GET any kind of transactions by User. */
router.get('/:currency_requested_type/:currency_offer_type/:userId', function(req, res, next) {
    Transaction.getPotentialTransactions(req.params.currency_requested_type, req.params.currency_offer_type, req.params.userId)
        .then(function (rows) {
        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});

/* PUT update transactions after approve by User. */
router.put('/:transactionId/:userId', function(req, res, next) {
    Transaction.closeTransaction(req.params.transactionId, req.params.userId)
        .then(function (rows) {

            Transaction.getById(req.params.transactionId).then(function(transaction){
                User.getByUser(transaction[0].offer_user_id).then(function(user){
                    transporter.sendMail(transporter.transactionMadeEmail(user[0],transaction[0]), function(error, info){
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Email has been sent, id : %s , %s', info.messageId, info.response);
                    });
                });
            });


        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});

/* PUT insert new transaction after created by User. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    Transaction.insertFutureTransaction(req.body)
        .then(function (rows) {
        console.log('explore-and-match started')
        var url = "https://hidden-savannah-96382.herokuapp.com/transactions/explore-and-match"; //http://127.0.0.1:3000

        request(url, function(err, resp, response) {
            console.log(response);
        });

        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});

module.exports = router;

