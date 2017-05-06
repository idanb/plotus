var express = require('express');
var router = express.Router();
var Transaction = require('../models/TransactionModel');

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
        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});

module.exports = router;

