var express = require('express');
var router = express.Router();
var Currency = require('../models/CurrencyModel');

/* /transactions/:status/:userId

/* GET All transactions listing. */
router.get('/', function(req, res, next) {
    Currency.getAll().then(function (rows) {
        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});

/* GET all atm locations. */
router.get('/atms', function(req, res, next) {
    Currency.getAllAtms().then(function (rows) {
        res.json(rows);
    }, function(reason) {
        res.json(reason);
    });
});

module.exports = router;

