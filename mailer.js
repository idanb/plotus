var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'AppPlutus@gmail.com',
        pass: '82008200'
    }
});

module.exports = transporter;