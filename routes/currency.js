var express = require('express');
var router = express.Router();
var Transaction = require('../models/CurrencyModel');

/* /transactions/:status/:userId

/* GET All transactions listing. */
router.get('/', function(req, res, next) {
    console.log("IDAN");
    Transaction.getAll().then(function (rows) {
        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});

// /* GET any kind of transactions of all users. */
// router.get('/:status', function(req, res, next) {
//     Transaction.getbyStatus(req.params.status).then(function (rows) {
//         res.json(rows);
//     }, function(reason) {
//         res.json(reason);
//     });
// });
//
// /* GET any kind of transactions by User. */
// router.get('/:status/:userId', function(req, res, next) {
//     Transaction.getByUser(req.params.status, req.params.userId).then(function (rows) {
//         res.json(rows);
//     }, function(reason) {
//         res.json(reason);
//     });
// });

module.exports = router;

