var mysql = require('mysql');


var db = mysql.createConnection({
    host     : 'us-cdbr-iron-east-03.cleardb.net',//'localhost',//'sql11.freesqldatabase.com', //'plotus.000webhostapp.com' '127.0.0.1'
    user     : 'bdd1f1f96bdbf6',//'root',//'sql11170577', //
    password : '8d1c7061',//'2411',//'wpehRVxDJb', //
    database : 'heroku_73428ab82ab4337'//'plotus'//'sql11170577' //'id1444985_plotus' //er
});

db.connect(function(err) {
    if (err) throw err;
});


module.exports = db;