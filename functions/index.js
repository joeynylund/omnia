const functions = require("firebase-functions");
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nylundja@gmail.com',
      pass: 'Nylund3221'
    }
});
  
var mailOptions = {
    from: 'nylundja@gmail.com',
    to: email,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};
  
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
});

});





