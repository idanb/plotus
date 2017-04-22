var mysql = require('mysql');


var db = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '2411',
    database : 'plotus'
});

db.connect(function(err) {
    if (err) throw err;
});

module.exports = db;