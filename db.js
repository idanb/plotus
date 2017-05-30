var mysql = require('mysql');


var db = mysql.createPool({
    host     : 'localhost',//'localhost',//'razma.mtacloud.co.il'
    user     : 'root',//'root',//'razma'
    password : '2411',//'2411',//'123456'
    database : 'plotus',//'plotus'//'razma_plotus'
    timezone: 'utc'
});


module.exports = db;