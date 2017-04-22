var mysql = require('mysql');


var db = mysql.createConnection({
    host     : 'plotus.000webhostapp.com', //'plotus.000webhostapp.com' '127.0.0.1'
    user     : 'id1444985_plotus', //id1444985_plotus
    password : '24118324', //'24118324'
    database : 'plotus'
});

db.connect(function(err) {
    if (err) throw err;
});

module.exports = db;