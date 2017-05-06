var mysql = require('mysql');


var db = mysql.createConnection({
    host     : 'us-cdbr-iron-east-03.cleardb.net',//'localhost',//'razma.mtacloud.co.il'
    user     : 'bdd1f1f96bdbf6',//'root',//'razma'
    password : '8d1c7061',//'2411',//'123456'
    database : 'heroku_73428ab82ab4337'//'plotus'//'razma_plotus'
});

db.connect(function(err) {
    if (err) throw err;
});


module.exports = db;