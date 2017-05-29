var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'AppPlutus@gmail.com',
        pass: '82008200'
    }
});

transporter.expiredEmail = function(email){
    return  {
        from: '"Plotus Application" <AppPlutus@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Your Transaction Expired', // Subject line
        html: '<b>ohh, Your Transaction Expired, please open a new one</b>' // html body
    }
};


transporter.transactionMadeEmail = function(email){
    return  {
        from: '"Plotus Application" <AppPlutus@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Your Transaction Matched a customer', // Subject line
        html: '<b>cheers, your Transaction Matched a customer </b>' // html body
    }
};

transporter.withdrawMadeEmail = function(email, code){
    return  {
        from: '"Plotus Application" <AppPlutus@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Your request to withdraw', // Subject line
        html: '<b>your withdraw from atm has been approved, your code is : '+ code +'</b>' // html body
    }
};

module.exports = transporter;