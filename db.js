var mysql = require('mysql');


var db = mysql.createConnection({
    host     : 'sql11.freesqldatabase.com', //'plotus.000webhostapp.com' '127.0.0.1'
    user     : 'sql11170577', //id1444985_plotus
    password : 'wpehRVxDJb', //'24118324'
    database : 'sql11170577' //'id1444985_plotus'
});

db.connect(function(err) {
    if (err) throw err;
});

module.exports = db;