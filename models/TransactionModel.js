var db = require('../db.js');
var q = require("q");


exports.getAll = function() {
   var deferred = q.defer();

    db.getConnection(function(err, connection) {
        connection.query('SELECT * FROM tblTransactions', function (error, results) {
            connection.release();
            if (error) {
                console.error(error);
                deferred.reject(error);
            }
            deferred.resolve(results);
        });
        return deferred.promise;
    });

}

exports.getById = function(status, id) {
    var deferred = q.defer();
    db.getConnection(function(err, connection) {
        connection.query('SELECT * FROM tblTransactions WHERE id = ?', [id], function (error, results) {
            connection.release();
            if (error) {
                console.error(error);
                deferred.reject(error);
            }
            deferred.resolve(results);
        });
    });
    return deferred.promise;
}

exports.getByUser = function(status, userId) {
    var deferred = q.defer();
    db.getConnection(function(err, connection) {
        connection.query('SELECT * FROM tblTransactions WHERE offer_user_id = ? AND status = ?', [userId, status], function (error, results) {
            connection.release();
            if (error) {
                console.error(error);
                deferred.reject(error);
            }
            deferred.resolve(results);
        });
    });
    return deferred.promise;
}

exports.getPotentialTransactions = function(offered_cur, requested_cur, user_id) {
    var deferred = q.defer();


    db.getConnection(function(err, connection) {
        var fields = "SELECT tr.id, u.`profile_picture_url`, u.`first_name`, u.`last_name`, tr.offer_user_id, tr.currency_requested_type, tr.currency_offer_type,  tr.`currency_offer_amount`, tr.`currency_requested_amount`, " +
            "cr_off.`code` AS off_code, cr_req.`code` AS req_code, tr.`currency_requested_amount` / tr.`currency_offer_amount` AS rate";
        var tables = " FROM tblTransactions tr" +
            " LEFT JOIN tblCurrency cr_off ON tr.`currency_offer_type` = cr_off.`id`" +
            " LEFT JOIN tblCurrency cr_req ON tr.`currency_requested_type` = cr_req.`id`" +
            " LEFT JOIN tblUsers u ON tr.`offer_user_id` = u.`id`";
        var conditions = " WHERE currency_offer_type = ? AND currency_requested_type = ? AND offer_user_id <> ? AND status = ?";

        connection.query(fields + tables + conditions, [offered_cur,requested_cur, user_id, 0], function (error, results) {
            connection.release();
            if (error) {
                console.error(error);
                deferred.reject(error);
            }
            deferred.resolve(results);
        });
    });
    return deferred.promise;
}

exports.getbyStatus = function(status) {
    var deferred = q.defer();

    db.getConnection(function(err, connection) {
        connection.query('SELECT * FROM tblTransactions WHERE status = ?', status, function (error, results) {
            connection.release();
            if (error) {
                console.error(error);
                deferred.reject(error);
            }
            deferred.resolve(results);
        });
    });
    return deferred.promise;
}

exports.closeTransaction = function(transaction_id,user_id) {
    var deferred = q.defer();

    db.getConnection(function(err, connection) {
        var query ="UPDATE tblTransactions SET accepter_user_id = ?, status = 1, exchanged_at = NOW() WHERE id = ?";

        connection.query(query, [user_id, transaction_id], function (error, results) {
            connection.release();
            if (error) {
                console.error(error);
                deferred.reject(error);
            }
            deferred.resolve(results);
        });
    });
    return deferred.promise;
}

exports.initTransaction = function() {
    var deferred = q.defer();
    db.getConnection(function(err, connection) {
        var query ="UPDATE tblTransactions SET accepter_user_id = NULL, status = 0, exchanged_at = NULL";
        connection.query(query, [], function (error, results) {
            connection.release();
            if (error) {
                console.error(error);
                deferred.reject(error);
            }
            deferred.resolve(results);
        });
    });
    return deferred.promise;
}

//takes all 0 status transactions
// iterateing and remove all the ones thats not match to the currency
// check which one is the best rate
// update transactions and remove them from list. update users balance.
//

exports.ExploreMatchTransactions = function() {
    var deferred = q.defer();
    db.getConnection(function(err, connection) {
        var query ="UPDATE tblTransactions SET accepter_user_id = NULL, status = 0, exchanged_at = NULL";
        connection.query(query, [], function (error, results) {
            connection.release();
            if (error) {
                console.error(error);
                deferred.reject(error);
            }
            deferred.resolve(results);
        });
    });
    return deferred.promise;
}