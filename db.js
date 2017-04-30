var mysql = require('mysql');


var db = mysql.createConnection({
    host     : 'us-cdbr-iron-east-03.cleardb.net',//'localhost',//'us-cdbr-iron-east-03.cleardb.net'
    user     : 'bdd1f1f96bdbf6',//'root',//'bdd1f1f96bdbf6', //
    password : '8d1c7061',//'2411',//'8d1c7061', //
    database : 'heroku_73428ab82ab4337'//'plotus'//'heroku_73428ab82ab4337' //'id1444985_plotus' //er
});

db.connect(function(err) {
    if (err) throw err;
});


module.exports = db;