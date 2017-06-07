var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'AppPlutus@gmail.com',
        pass: '82008200'
    }
});

transporter.expiredEmail = function(user){
    return  {
        from: '"Plotus Application" <AppPlutus@gmail.com>', // sender address
        to: user.email_address, // list of receivers
        subject: 'Your Transaction Expired', // Subject line
        html: 'Hi '+user.first_name+','+
        'There was no match for you within the specified time range.'+
        'You are more than welcome to return Plutu$ app and set up a new transaction.'
    }
};


transporter.transactionMadeEmail = function(user,transaction){
    return  {
        from: '"Plotus Application" <AppPlutus@gmail.com>', // sender address
        to: user.email_address, // list of receivers
        subject: 'Your Transaction Matched a customer', // Subject line
        html: 'Hi '+ user.first_name + ',' +
        '<b>We found a match for you!</b>'+ '<br/>' +
        'Your transaction details:'+ '<br/>' +
        // 'You have converted with user id :'+ transaction.offer_user_id +'<br/>' +
        // 'Source currency:'+ transaction.currency_offer_type + '<br/>' +
        // 'Amount of money for conversion:  '+ transaction.currency_offer_amount + '<br/>' +
        // 'Target currency: ' + transaction.currency_requested_type + '<br/>' +
        // 'Amount of money after conversion:'+ transaction.currency_requested_amount + '<br/>' +
        'Exchange rate:' + transaction.rate
    }
};

transporter.withdrawMadeEmail = function(user, code){
    return  {
        from: '"Plotus Application" <AppPlutus@gmail.com>', // sender address
        to: user.first_name, // list of receivers
        subject: 'Your request to withdraw', // Subject line
        html: 'Hi '+user.first_name+','+ '<br/>' +
        'Secret Code: '+ code + '<br/>' +
        'Do not forget the first code you entered in the app.'+ '<br/>' +
        'Once you get to the ATM you will be asked to enter the two codes, with which you can withdraw your money in cash.'

    }
};

module.exports = transporter;