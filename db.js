var mysql = require('mysql');


var db = mysql.createConnection({
    host     : 'sql11.freesqldatabase.com',//'localhost',//'sql11.freesqldatabase.com', //'plotus.000webhostapp.com' '127.0.0.1'
    user     : 'sql11170577',//'root',//'sql11170577', //
    password : 'wpehRVxDJb',//'2411',//'wpehRVxDJb', //
    database : 'sql11170577'//'plotus'//'sql11170577' //'id1444985_plotus' //er
});

db.connect(function(err) {
    if (err) throw err;
});

module.exports = db;