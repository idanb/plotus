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
    db.query('SELECT * FROM tblUsers WHERE id = ?', userId, function (error, results) {
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
             deferred.reject(error);
         }
         deferred.resolve(results);
     });
     return deferred.promise;
}