var express = require('express');
var router = express.Router();
var Transaction = require('../models/CurrencyModel');

/* /transactions/:status/:userId

/* GET All transactions listing. */
router.get('/', function(req, res, next) {
    Transaction.getAll().then(function (rows) {
        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});

/* GET all atm locations. */
router.get('/atms', function(req, res, next) {
    Transaction.getAllAtms().then(function (rows) {
        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});

// /* GET any kind of transactions by User. */
// router.get('/:status/:userId', function(req, res, next) {
//     Transaction.getByUser(req.params.status, req.params.userId).then(function (rows) {
//         res.json(rows);
//     }, function(reason) {
//         res.json(reason);
//     });
// });

module.exports = router;

