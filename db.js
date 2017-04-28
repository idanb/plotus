var mysql = require('mysql');


var db = mysql.createConnection({
    host     : 'localhost',//'localhost',//'sql11.freesqldatabase.com', //'plotus.000webhostapp.com' '127.0.0.1'
    user     : 'root',//'root',//'sql11170577', //
    password : '2411',//'2411',//'wpehRVxDJb', //
    database : 'plotus'//'plotus'//'sql11170577' //'id1444985_plotus' //er
});

db.connect(function(err) {
    if (err) throw err;
});

module.exports = db;