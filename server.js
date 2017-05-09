var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cron = require('node-cron');
var request = require('request');

var index = require('./routes/index');
var users = require('./routes/users');
var transactions = require('./routes/transcations');
var currency = require('./routes/currency');

var app = express();
var port = process.env.PORT || '3000';


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/transactions', transactions);
app.use('/currency', currency);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var task = cron.schedule('1,2,3 * * * * *', function() {
    console.log('immediately started');
    // var url = "https://openexchangerates.org/api/latest.json?app_id=1f49ab9363964bf2ad2f113800a44fbe";
    //
    // request(url, function(err, resp, response) {
    //     response = JSON.parse(response);
    //     var types = ['USD','ILS','JPY','EUR','GBP'];
    //             $scope.rates = "";
    //             types.forEach(function(k) {
    //                 $scope.rates += k + ':' + response.data.rates[k] + ', ';
    //             });
    // });
}, false);

task.start();

process.on('uncaughtException', function(err) {
    console.log(err);
});

// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});


// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;
