var db = require('../db.js');
var q = require("q");


exports.getAll = function() {
   var deferred = q.defer();
    db.query('SELECT * FROM tblCurrency', function (error, results) {
        if (error) {
            console.error(error);
            deferred.reject(error);
        }
        deferred.resolve(results);
    });
    return deferred.promise;
}

// exports.getByUser = function(status, userId) {
//     var deferred = q.defer();
//     db.query('SELECT * FROM tblTransactions WHERE offer_user_id = ? AND status = ?', [userId, status], function (error, results) {
//         if (error) {
//             console.error(error);
//             deferred.reject(error);
//         }
//         deferred.resolve(results);
//     });
//     return deferred.promise;
// }
//
// exports.getbyStatus = function(status) {
//     var deferred = q.defer();
//     db.query('SELECT * FROM tblTransactions WHERE status = ?', status, function (error, results) {
//         if (error) {
//             console.error(error);
//             deferred.reject(error);
//         }
//         deferred.resolve(results);
//     });
//     return deferred.promise;
// }