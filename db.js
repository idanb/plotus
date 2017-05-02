var mysql = require('mysql');


var db = mysql.createConnection({
    host     : 'localhost',//'localhost',//'razma.mtacloud.co.il'
    user     : 'root',//'root',//'razma'
    password : '2411',//'2411',//'123456'
    database : 'plotus'//'plotus'//'razma_plotus'
});

db.connect(function(err) {
    if (err) throw err;
});


module.exports = db;