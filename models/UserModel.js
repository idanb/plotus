var db = require('../db.js');
var q = require('q');

exports.getAll = function() {
   var deferred = q.defer();
    db.query('SELECT * FROM tblUsers', function (error, results) {
        if (error) {
            console.error(error);
            deferred.reject(error);
        }
        deferred.resolve(results);
    });
    return deferred.promise;
}

exports.getByUser = function(userId) {
    var deferred = q.defer();
    db.query('SELECT * FROM tblUsers u WHERE id = ?', userId, function (error, results) {
        if (error) {
            console.error(error);
            deferred.reject(error);
        }
        deferred.resolve(results);
    });
    return deferred.promise;
}
// SELECT * FROM tblUserBalance ub WHERE userId = ? LEFT JOIN tblCurrency c ON c.id = ub.currencyId

exports.getUserBalanceByUserId = function(userId) {
    var deferred = q.defer();
    db.query('SELECT * FROM `tblUserBalance` ub LEFT JOIN `tblCurrency` c ON c.id = ub.currencyId WHERE ub.userId = ?', userId, function (error, results) {
        if (error) {
            console.error(error);
            deferred.reject(error);
        }
        deferred.resolve(results);
    });
    return deferred.promise;
}

exports.updateUserByUserId = function(userId,data) {
    var deferred = q.defer();
    var query = "UPDATE tblUsers SET ? WHERE ?";
    db.query(query, [data, { id: userId }], function (error, results) {
        if (error) {
            console.error(error);
            deferred.reject(error);
        }
        deferred.resolve(results);
    });
    return deferred.promise;
}


 exports.authenticateUser = function(email,password) {
     var deferred = q.defer();
     db.query('SELECT * FROM tblUsers WHERE email_address = ? AND password = ?', [email, password], function (error, results) {
         if (error) {
             console.error(error);
             console.log("ERROR",error);
             deferred.reject(error);
         }
         deferred.resolve(results);
     });
     return deferred.promise;
}